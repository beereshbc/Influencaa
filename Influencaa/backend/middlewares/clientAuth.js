import jwt from "jsonwebtoken";

const clientAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    const clientToken = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(clientToken, process.env.JWT_TOKEN);

    req.clientId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default clientAuth;
