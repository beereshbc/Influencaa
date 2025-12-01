import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      // Ensure payment is uniquely linked to one order
      unique: true,
    },

    // --- Overall Payment State ---
    paymentStatus: {
      type: String,
      // Added 'pending_release' to indicate funds are held and waiting for disbursement
      enum: [
        "unpaid",
        "initiated",
        "paid",
        "failed",
        "refunded",
        "pending_release",
      ],
      default: "unpaid",
    },

    // --- Core Transaction Details ---
    paymentId: {
      type: String,
      default: null,
    }, // Razorpay Payment ID (R-ID) for the initial full transfer
    razorpayOrderId: {
      type: String,
      default: null,
    }, // Razorpay Order ID (Order_ID) for the initial full payment

    // --- Monetary Details (Total amount held in escrow) ---
    totalEscrowAmount: {
      type: Number,
      default: 0,
    },
    paymentCurrency: {
      type: String,
      default: "INR",
    },

    // --- Milestone and Release Tracking for Escrow Flow ---
    milestones: [
      {
        milestoneName: {
          type: String,
          required: true,
        },
        amountDue: {
          type: Number,
          required: true, // Amount allocated to this milestone
        },
        status: {
          type: String,
          enum: ["pending", "released", "disputed"],
          default: "pending",
        },
        releaseDate: {
          type: Date,
          default: null, // Date the payment was released to the influencer
        },
        releaseTxnId: {
          type: String,
          default: null, // Transaction ID for the release operation (not the initial payment)
        },
      },
    ],

    // --- Timestamps ---
    initialPaymentDate: {
      type: Date,
      default: null, // Date the full payment entered escrow
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
