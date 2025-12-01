import express from "express";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import cors from "cors";
import adminRouter from "./routes/adminRouter.js";
import sellerRouter from "./routes/sellerRouter.js";
import clientRouter from "./routes/clientRouter.js";
import connectCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;

const app = express();
await connectDB();
await connectCloudinary();

// 1. Middleware
app.use(express.json());

// 2. FIXED CORS CONFIGURATION
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:5173",
    ], // Add your frontend URL here
    credentials: true, // This allows cookies/headers to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "influencertoken"],
  })
);

// 3. Routes
app.use("/api/admin", adminRouter);
app.use("/api/influencer", sellerRouter);
app.use("/api/client", clientRouter);

app.get("/", (req, res) => {
  res.send("Influncaa server is walking...");
});

app.listen(PORT, () => {
  console.log(`server walking successfully on port ${PORT}`);
});
