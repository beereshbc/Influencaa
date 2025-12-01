import express from "express";
import validator from "validator";
import clientModel from "../models/clientModels/clientModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import campaignModel from "../models/sellerModels/campaignModel.js";
import orderModel from "../models/sellerModels/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import paymentModel from "../models/sellerModels/paymentModel.js";

const registerClient = async (req, res) => {
  try {
    const { name, companyName, email, password } = req.body;
    if (!name || !companyName || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }
    const existingClient = await clientModel.findOne({ email });
    if (existingClient) {
      return res.json({ success: false, message: "Email already registered" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const clientData = {
      name,
      companyName,
      email,
      password: hashedPassword,
    };

    const newClient = new clientModel(clientData);
    const client = await newClient.save();

    const clientToken = await jwt.sign(
      { id: client._id },
      process.env.JWT_TOKEN
    );

    res.json({ success: true, clientToken });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }

    const client = await clientModel.findOne({ email });
    if (!client) {
      return res.json({
        success: false,
        message: "User not found! Please Create Account",
      });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (isMatch) {
      const clientToken = await jwt.sign(
        { id: client._id },
        process.env.JWT_TOKEN
      );
      res.json({ success: true, clientToken });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getInfluencers = async (req, res) => {
  try {
    const clientId = req.clientId;

    if (!clientId) {
      return res.status(401).json({
        success: false,
        message: "You are not an authenticated user. Please login!",
      });
    }

    let influencersList = await campaignModel
      .find({})
      .populate({
        path: "sellerId",
        select: `
          fullName
          email
          thumbnail
          coverImage
          niche
          bio
          location
          phone
          languages
          audience
          rating
          totalReviews
          engagement
          responseTime
          deliveryTime
          connectedPlatforms
          createdAt
          updatedAt
        `,
      })
      .lean();

    if (!influencersList || influencersList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No influencer data found.",
      });
    }

    // MERGE seller + campaign into one object
    influencersList = influencersList.map((item) => {
      const seller = item.sellerId;
      delete item.sellerId;

      return {
        ...item,
        seller, // merged seller object
      };
    });

    return res.status(200).json({
      success: true,
      data: influencersList,
      message: "Influencers fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching influencers:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Unable to fetch influencers.",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  const clientId = req.clientId;

  // Safety check (should be redundant if middleware is properly configured)
  if (!clientId) {
    res.status(401);
    throw new Error("Not authorized. Client ID missing from request.");
  }
  // 1. Get the user ID from the request object (assuming authentication middleware adds it)
  // const buyerId = req.user.id;

  // For this example, we'll assume authentication is done and we trust the payload data structure
  const {
    influencerId,
    influencerName,
    platform,
    service,
    serviceDetails,
    orderDetails,
    totalAmount,
  } = req.body;

  // 2. Basic Validation Check (Mongoose handles schema validation, but a quick check is good)
  if (
    !influencerId ||
    !platform ||
    !service ||
    !totalAmount ||
    !orderDetails ||
    !serviceDetails
  ) {
    res.status(400);
    throw new Error("Missing required order fields.");
  }

  // 3. Optional: Verify influencerId exists (Good practice but often heavy for high traffic)
  // const influencerExists = await Seller.findById(influencerId);
  // if (!influencerExists) {
  //     res.status(404);
  //     throw new Error("Influencer not found.");
  // }

  // 4. Create the new order document
  const newOrder = new orderModel({
    influencerId,
    clientId,
    influencerName,
    platform,
    service,
    serviceDetails,
    orderDetails: {
      // Map orderDetails fields from frontend payload
      brandName: orderDetails.brandName,
      contactPerson: orderDetails.contactPerson,
      email: orderDetails.email,
      phone: orderDetails.phone,
      campaignBrief: orderDetails.campaignBrief,
      budget: orderDetails.budget, // Storing as string as defined in schema
      timeline: orderDetails.timeline, // Storing as string as defined in schema
      specialRequirements: orderDetails.specialRequirements,
      targetAudience: orderDetails.targetAudience,
      campaignGoals: orderDetails.campaignGoals,
      contentGuidelines: orderDetails.contentGuidelines,
    },
    totalAmount,
    // status defaults to 'pending' as defined in your Mongoose schema
  });

  // 5. Save the order to the database
  const savedOrder = await newOrder.save();

  // 6. Respond to the client
  res.status(201).json({
    success: true,
    message: "Order submitted successfully. Awaiting approval.",
    order: savedOrder,
  });
};

const getOrders = async (req, res) => {
  const clientId = req.clientId;

  if (!clientId) {
    res.status(401);
    throw new Error("Not authorized. Client ID missing from request.");
  }

  const orders = await orderModel.find({ clientId: clientId }).sort({
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

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { orderId } = req.body; // Fetch the Order data. We populate the paymentRef if it exists.

    const orderData = await orderModel.findById(orderId).populate("paymentRef");

    if (!orderData || orderData.cancelled || orderData.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Order not found, cancelled, or not approved for payment.",
      });
    }

    // Check if the order is already paid or initiated
    if (orderData.paymentRef && orderData.paymentRef.paymentStatus === "paid") {
      return res
        .status(400)
        .json({ success: false, message: "Order payment already completed." });
    }

    let paymentRecord;

    // --- 1. Fetch or Create Payment Record ---
    if (!orderData.paymentRef) {
      // Create a new Payment record linked to the Order
      paymentRecord = new paymentModel({
        orderRef: orderId,
        totalEscrowAmount: orderData.totalAmount, // Use totalAmount from Order
        paymentCurrency: process.env.CURRENCY || "INR",
      });
      await paymentRecord.save();

      // Link the new Payment record ID back to the Order
      await orderModel.findByIdAndUpdate(orderId, {
        paymentRef: paymentRecord._id,
      });
    } else {
      paymentRecord = orderData.paymentRef;
    } // Razorpay amount is always in the smallest unit (e.g., paise for INR).

    const amountInSmallestUnit = orderData.totalAmount * 100;

    const options = {
      amount: amountInSmallestUnit,
      currency: paymentRecord.paymentCurrency,
      receipt: orderId.toString(), // Use Mongoose Order _id as receipt ID
      notes: {
        orderId: orderId.toString(),
        clientId: orderData.clientId.toString(),
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(options); // --- 2. Update Payment Model Status ---

    await paymentModel.findByIdAndUpdate(paymentRecord._id, {
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "initiated", // Payment flow initiated
    });

    res.json({
      success: true, // Return the necessary details for the frontend's initPay function
      order: {
        id: razorpayOrder.id, // Razorpay Order ID
        amount: razorpayOrder.amount, // Amount in paise/cents
        currency: razorpayOrder.currency,
        reciept: razorpayOrder.receipt, // Mongoose order ID
      },
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // The secret key used for HMAC comparison
    const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_SECRET) {
      // This indicates a critical server configuration failure
      console.error("FATAL ERROR: RAZORPAY_KEY_SECRET is not defined.");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error." });
    }

    if (!razorpay_order_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required payment data." });
    } // --- 1. Signature Verification ---

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Fetch the Payment record using the Razorpay Order ID
      const paymentRecord = await paymentModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          $set: {
            paymentStatus: "paid", // Payment is validated and successful
            paymentId: razorpay_payment_id, // Store transaction ID
            initialPaymentDate: new Date(),
            transactionDate: new Date(),
          },
        },
        { new: true }
      );

      if (!paymentRecord) {
        // This should ideally not happen if the initiation flow worked
        return res.status(404).json({
          success: false,
          message: "Payment validated but linked Payment record not found.",
        });
      }

      // --- 2. Update Campaign Status ---
      await orderModel.findByIdAndUpdate(paymentRecord.orderRef, {
        status: "in_progress", // Campaign moves to active execution
      });

      return res.json({
        success: true,
        message: "Payment Successful and Campaign Started",
      });
    } else {
      // --- 3. Handle Failed Signature ---
      // Update Payment record status to failed if signature check fails
      await paymentModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "failed" }
      );

      return res.status(400).json({
        success: false,
        message: "Payment verification failed (Invalid signature).",
      });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchOrderPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    // Assuming clientAuth middleware sets req.user.id
    const clientId = req.clientId;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Order ID." });
    }

    // Fetch order and populate the payment details using the paymentRef
    // We ensure the client owns the order for security
    const orderDetails = await orderModel
      .findOne({ _id: orderId, clientId: clientId })
      .populate("paymentRef");

    if (!orderDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found or access denied." });
    }

    // Ensure the paymentRef is populated (it should be, but a check is safe)
    if (!orderDetails.paymentRef) {
      // If the payment record is missing, it implies the order was created but initiation failed
      // or the record link wasn't established. We return the order anyway but flag the missing details.
      return res.status(200).json({
        success: true,
        data: {
          ...orderDetails.toObject(),
          paymentDetailsMissing: true,
        },
      });
    }

    return res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    console.error("Fetch Payment Details Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve payment flow details.",
    });
  }
};

export {
  registerClient,
  clientLogin,
  getInfluencers,
  createOrder,
  getOrders,
  paymentRazorpay,
  verifyRazorpay,
  fetchOrderPaymentDetails,
};
