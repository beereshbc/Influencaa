import mongoose from "mongoose";

// --- Order Schema ---
// This model tracks the core service and campaign details, and references the payment.
const orderSchema = new mongoose.Schema(
  {
    // User References
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Assuming 'Seller' is the Influencer model
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    influencerName: {
      type: String,
      required: true,
      trim: true,
    },

    // Service Core Data
    platform: {
      type: String,
      enum: ["instagram", "youtube", "facebook", "twitter", "linkedin"],
      required: true,
    },
    service: {
      type: String,
      enum: ["I1", "I2", "I3"],
      required: true,
    },

    // Service Details (Embedded Document)
    serviceDetails: {
      service: { type: String, required: true },
      amount: { type: Number, required: true },
      timeline: { type: String, required: true },
      revisions: { type: Number, required: true },
      description: { type: String, required: true },
      deliverables: [{ type: String }],
      requirements: [{ type: String }],
    },

    // Campaign/Client Brief Details (Embedded Document)
    orderDetails: {
      brandName: { type: String, required: true },
      contactPerson: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      campaignBrief: { type: String, required: true },
      budget: { type: String, required: true },
      timeline: { type: String, required: true },
      specialRequirements: { type: String },
      targetAudience: { type: String },
      campaignGoals: { type: String },
      contentGuidelines: { type: String },
    },

    // Financial Summary
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      // The total cost of the service
    },

    // --- Critical Update: Payment Reference ---
    paymentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Link to the separate Payment model
      // Ensures every order has a corresponding payment record
      unique: true,
    },

    // Campaign/Service Lifecycle Status
    status: {
      type: String,
      enum: [
        "pending", // Awaiting influencer approval/client deposit
        "approved",
        "rejected",
        "in_progress",
        "delivered",
        "completed",
      ],
      default: "pending",
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    // Cancellation Flag
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
