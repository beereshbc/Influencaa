import express from "express";
import {
  registerInfluencer,
  influencerLogin,
  getCampaigns,
  addPackage,
  updatePackage,
  togglePackageStatus,
  deletePackage,
  getProfile,
  updateProfile,
  getOrders,
  acceptOrder,
} from "../controllers/sellerController.js";
import upload from "../middlewares/multer.js";
import sellerAuth from "../middlewares/sellerAuth.js";

const sellerRouter = express.Router();

sellerRouter.post("/register", registerInfluencer);
sellerRouter.post("/login", influencerLogin);
sellerRouter.get("/campaigns", sellerAuth, getCampaigns);
sellerRouter.post("/packages", sellerAuth, addPackage);
sellerRouter.put("/packages/:id", sellerAuth, updatePackage);
sellerRouter.put("/packages/toggle/:id", sellerAuth, togglePackageStatus);
sellerRouter.delete("/packages/:id", sellerAuth, deletePackage);
sellerRouter.get("/profile", sellerAuth, getProfile);
sellerRouter.get("/orders", sellerAuth, getOrders);
sellerRouter.put("/orders/:id/accept", sellerAuth, acceptOrder);
sellerRouter.post(
  "/profile",
  sellerAuth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateProfile
);

export default sellerRouter;
