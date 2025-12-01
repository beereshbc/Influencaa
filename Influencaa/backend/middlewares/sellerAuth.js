import jwt from "jsonwebtoken";

const sellerAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    const influencerToken = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(influencerToken, process.env.JWT_TOKEN);

    req.sellerId = decodedToken.id;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default sellerAuth;
