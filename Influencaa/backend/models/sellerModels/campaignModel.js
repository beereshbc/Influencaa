import mongoose from "mongoose";

// Sub-schema for individual services
const serviceSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  deliverables: [{ type: String }],
  timeline: { type: String },
  revisions: { type: Number },
  requirements: [{ type: String }],
  // Added this field to support your UI toggle
  published: { type: Boolean, default: true },
});

const campaignSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    platform: {
      type: String,
      enum: ["instagram", "youtube", "linkedin", "twitter", "facebook"],
      required: true,
    },
    username: { type: String },
    followers: { type: String },
    engagementRate: { type: Number },
    avgViews: { type: String },
    verification: { type: Boolean, default: false },
    services: [serviceSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", campaignSchema);
