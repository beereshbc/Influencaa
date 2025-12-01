import campaignModel from "../models/sellerModels/campaignModel.js";
import Influencer from "../models/sellerModels/sellerModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sellerModel from "../models/sellerModels/sellerModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import orderModel from "../models/sellerModels/orderModel.js";

// =========================
// 1. AUTH CONTROLLERS
// =========================

export const registerInfluencer = async (req, res) => {
  try {
    const { fullName, email, password, niche } = req.body; // --- 1. Basic Validation ---

    if (!fullName || !email || !password || !niche) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (Full Name, Email, Password, Niche).",
      });
    } // --- 2. Email Validation & Existence Check ---

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email address." });
    }

    const existingInfluencer = await Influencer.findOne({ email });
    if (existingInfluencer) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered." }); // 409 Conflict
    } // --- 3. Password Validation ---

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 or more characters long.",
      });
    } // --- 4. Hashing Password ---

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // --- 5. Create and Save Influencer ---

    const newInfluencer = new Influencer({
      fullName,
      email,
      password: hashedPassword,
      niche,
    });

    const influencer = await newInfluencer.save(); // --- 6. Generate Token and Respond ---

    const influencerToken = jwt.sign(
      { id: influencer._id },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" } // Recommended: add token expiration
    );

    return res.status(201).json({
      // 201 Created
      success: true,
      message: "Registration successful",
      influencerToken,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration.",
    });
  }
};

export const influencerLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // --- 1. Basic Validation ---

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password." });
    } // --- 2. Find User and Explicitly Select Password ---

    // 💡 FIX: Use .select('+password') to include the password hash,
    // assuming it is set to { select: false } in the Mongoose schema.
    const influencer = await Influencer.findOne({ email }).select("+password");

    if (!influencer) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // --- 3. Robust Password Check ---
    // Check if the influencer object has the password hash before comparing
    if (!influencer.password) {
      // This should theoretically not happen if .select('+password') worked,
      // but it guards against missing or corrupted data.
      throw new Error("Password hash missing in database record.");
    }

    const isMatch = await bcrypt.compare(password, influencer.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    } // --- 4. Generate Token and Respond ---

    const influencerToken = jwt.sign(
      { id: influencer._id },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      influencerToken,
    });
  } catch (error) {
    console.error("Login Error:", error); // Catch-all for database errors, hashing problems, or uncaught exceptions
    return res
      .status(500)
      .json({ success: false, message: "Internal server error during login." });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    // ✅ FIX: Get sellerId from the authentication middleware (req.user.id)
    const sellerId = req.sellerId;

    if (!sellerId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const campaigns = await campaignModel.find({ sellerId });

    // Transform DB Array into a keyed Object for frontend mapping: { instagram: {...}, youtube: {...} }
    const formattedData = {};

    campaigns.forEach((camp) => {
      const packageObj = {};

      if (camp.services && camp.services.length > 0) {
        camp.services.forEach((pkg) => {
          packageObj[pkg._id] = pkg;
        });
      }

      formattedData[camp.platform] = {
        _id: camp._id,
        label: camp.platform.charAt(0).toUpperCase() + camp.platform.slice(1),
        username: camp.username,
        followers: camp.followers,
        engagementRate: camp.engagementRate,
        verification: camp.verification,
        packages: packageObj,
      };
    });

    res.json({ success: true, campaignData: formattedData });
  } catch (error) {
    console.error("Get Campaigns Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch campaigns." });
  }
};

export const addPackage = async (req, res) => {
  try {
    const sellerId = req.sellerId;

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    const payload = req.body;
    const platform = payload?.platform;

    if (!platform) {
      return res.status(400).json({
        success: false,
        message: "Platform is required",
      });
    }

    const { platform: _, ...serviceData } = payload;

    let campaign = await campaignModel.findOne({ sellerId, platform });

    if (!campaign) {
      const seller = await sellerModel.findById(sellerId);

      campaign = new campaignModel({
        sellerId,
        platform,
        username: seller?.fullName || "",
        followers: "0",
        engagementRate: 0,
        avgViews: "0",
        verification: false,
        services: [],
      });
    }

    // ✅ Ensure services array exists
    if (!Array.isArray(campaign.services)) {
      campaign.services = [];
    }

    // ✅ Force Mongoose to detect change
    campaign.services.unshift(serviceData); // use unshift to avoid reference caching
    campaign.markModified("services");

    await campaign.save({ validateBeforeSave: true });

    res.status(201).json({
      success: true,
      message: "Package saved successfully",
      package: serviceData,
    });
  } catch (error) {
    console.error("Create Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save package",
      error: error.message,
    });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params; // Package ID
    const sellerId = req.sellerId; // Get sellerId from auth middleware
    const updateFields = req.body; // Fields to update

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    // Build the update query for the nested service
    const updateQuery = {};
    Object.keys(updateFields).forEach((key) => {
      updateQuery[`services.$.${key}`] = updateFields[key];
    });

    // Find campaign that contains this service and belongs to seller
    const updatedCampaign = await campaignModel.findOneAndUpdate(
      { "services._id": id, sellerId },
      { $set: updateQuery },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({
        success: false,
        message: "Package not found or unauthorized.",
      });
    }

    const updatedService = updatedCampaign.services.id(id);

    res.json({
      success: true,
      message: "Package updated successfully",
      package: updatedService,
    });
  } catch (error) {
    console.error("Update Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update package.",
    });
  }
};

export const togglePackageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.sellerId;
    const { published } = req.body;

    const updatedCampaign = await campaignModel.findOneAndUpdate(
      { "services._id": id, sellerId },
      { $set: { "services.$.published": published } },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({
        success: false,
        message: "Package not found or unauthorized.",
      });
    }

    res.json({
      success: true,
      message: `Package ${published ? "published" : "hidden"}`,
    });
  } catch (error) {
    console.error("Toggle Status Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to change package status." });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.sellerId;

    const campaign = await campaignModel.findOneAndUpdate(
      { "services._id": id, sellerId },
      { $pull: { services: { _id: id } } },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Package not found or unauthorized.",
      });
    }

    res.json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    console.error("Delete Package Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete package." });
  }
};
// ==========================================
// 1. PROFILE DATA MANAGEMENT (Embedded Logic)
// ==========================================

export const getProfile = async (req, res) => {
  try {
    const sellerId = req.sellerId;

    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access (Missing ID in token)",
      });
    }

    // FIX 1: Removed .populate() since connectedPlatforms is now embedded.
    const seller = await sellerModel.findById(sellerId);

    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Optional: Trigger background refresh of stats from APIs (IG/YT)
    // refreshStatsInBackground(sellerId, seller.connectedPlatforms);

    res.json({ success: true, data: seller });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // ❌ BUG FIX: Get sellerId from the auth middleware output (e.g., req.user.id)
    // Replace req.user.id with the actual property name your auth middleware uses!
    const sellerId = req.sellerId;

    if (!sellerId) {
      // This should ideally be caught by the middleware, but serves as a safety check
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user ID from token.",
      });
    }

    const updates = { ...req.body };

    // Prevent protected fields from being modified
    const notAllowed = [
      "_id",
      "email",
      "password",
      "rating",
      "audience",
      "engagement",
      "totalReviews",
      "connectedPlatforms",
      "campaigns",
      "createdAt",
      "updatedAt",
      "__v",
      "sellerId",
    ];

    notAllowed.forEach((field) => delete updates[field]);

    // =============================
    // CLOUDINARY IMAGE HANDLING
    // =============================

    // The frontend sends files with the field names 'thumbnail' and 'coverImage'.
    // Multer (or similar middleware) places them in req.files.

    // Check if files array exists and has content for the field
    if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
      const thumbnailFile = req.files.thumbnail[0];
      const thumbnailUpload = await cloudinary.uploader.upload(
        thumbnailFile.path,
        { folder: "sellers/thumbnails" }
      );
      updates.thumbnail = thumbnailUpload.secure_url;
      fs.unlinkSync(thumbnailFile.path); // Cleanup temporary file
    }

    if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
      const coverFile = req.files.coverImage[0];
      const coverUpload = await cloudinary.uploader.upload(coverFile.path, {
        folder: "sellers/covers",
      });
      updates.coverImage = coverUpload.secure_url;
      fs.unlinkSync(coverFile.path); // Cleanup temporary file
    }

    // =============================
    // ARRAY FIELD FIX (Languages)
    // =============================
    // Multer-enabled body parsing often turns 'languages[]' into an array,
    // but if only one item is sent, it might be a string. We ensure it's an array
    // for Mongoose's $set to handle it correctly.
    if (updates.languages && !Array.isArray(updates.languages)) {
      // If it's a single string (e.g., 'English, French'), convert to an array.
      updates.languages = updates.languages.split(",").map((s) => s.trim());
    }

    // ✅ Update seller profile
    const updatedSeller = await sellerModel.findByIdAndUpdate(
      sellerId,
      { $set: updates }, // Use $set to only update provided fields
      { new: true, runValidators: true, select: "-password" } // Exclude password from response
    );

    if (!updatedSeller) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedSeller,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    // Be more descriptive for validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${error.message}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update profile due to a server error.",
    });
  }
};

export const getOrders = async (req, res) => {
  const sellerId = req.sellerId;

  if (!sellerId) {
    res.status(401);
    throw new Error("Not authorized. Client ID missing from request.");
  }

  const orders = await orderModel.find({ influencerId: sellerId }).sort({
    createdAt: -1,
  });
  if (!orders || orders.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No orders found for this client.",
      orders: [],
    });
  }

  res.status(200).json({
    success: true,
    count: orders.length,
    orders: orders,
  });
};

export const acceptOrder = async (req, res) => {
  // NOTE: This assumes an authentication middleware ran and attached
  // the authenticated influencer's ID to req.user (or req.influencer).
  const influencerId = req.sellerId;
  const orderId = req.params.id;

  // 1. Find the order by ID and ensure it belongs to the authenticated influencer
  const order = await orderModel.findOne({
    _id: orderId,
    influencerId: influencerId, // Crucial security check: Ownership verification
    status: "pending", // Only allow acceptance if the status is currently 'pending'
  });

  if (!order) {
    res.status(404);
    throw new Error("Order not found or already processed.");
  }

  // 2. Update the status to 'approved'
  order.status = "approved";

  // Optional: Add a timestamp for acceptance in the orderFlow field if you have one
  // order.orderFlow.accepted = new Date();

  const updatedOrder = await order.save();

  // 3. Respond with success
  res.status(200).json({
    success: true,
    message: `Order ${orderId} successfully approved.`,
    order: updatedOrder,
  });
};
