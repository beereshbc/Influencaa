import express from "express";
import {
  clientLogin,
  createOrder,
  fetchOrderPaymentDetails,
  getInfluencers,
  getOrders,
  paymentRazorpay,
  registerClient,
  verifyRazorpay,
} from "../controllers/clientController.js";
import clientAuth from "../middlewares/clientAuth.js";

const clientRouter = express.Router();

clientRouter.post("/register", registerClient);
clientRouter.post("/login", clientLogin);
clientRouter.get("/influencers", clientAuth, getInfluencers);
clientRouter.post("/orders", clientAuth, createOrder);
clientRouter.get("/orders", clientAuth, getOrders);
clientRouter.post("/payment-razorpay", paymentRazorpay);
clientRouter.post("/verifyRazorpay", clientAuth, verifyRazorpay);
clientRouter.get(
  "/order-payment-details/:orderId",
  clientAuth,
  fetchOrderPaymentDetails
);

export default clientRouter;
