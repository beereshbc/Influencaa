import mongoose from "mongoose";

// ==========================================
// Embedded Platform Connection Schema
// ==========================================
const platformConnectionSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: ["instagram", "youtube", "linkedin", "twitter", "facebook"],
      required: true,
    },

    // Platform Identity
    platformUserId: { type: String, required: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "" },

    // Metrics
    followers: { type: String, default: "0" },
    engagementRate: { type: Number, default: 0 },
    avgViews: { type: String, default: "0" },
    verification: { type: Boolean, default: false },

    lastSynced: { type: Date, default: Date.now },

    // Secure Tokens (hidden)
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    tokenExpiry: { type: Date, select: false },
  },
  { timestamps: true }
);

// ==========================================
// SELLER MODEL (Merged & Final)
// ==========================================
const sellerSchema = new mongoose.Schema(
  {
    // --- Auth & Identity ---
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

    // --- Profile Visuals ---
    thumbnail: { type: String, default: "" },
    coverImage: { type: String, default: "" },

    // --- Personal Details ---
    niche: { type: String, default: "General" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    languages: [{ type: String }],

    // --- Aggregate Stats ---
    audience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 },
    responseTime: { type: String, default: "1 hour" },
    deliveryTime: { type: String, default: "3 days" },

    // --- Embedded Social Platforms ---
    connectedPlatforms: [platformConnectionSchema],
  },
  { timestamps: true }
);

// ✅ Final Export
export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
