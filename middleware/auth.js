import jwt from "jsonwebtoken";
import db from "../app/models/index.js";

const Accounts = db.accounts;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "failed", message: "Authorization required" });
    }

    // Extract the actual token
    const token = authHeader.split(" ")[1];

    // Verify the token properly
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user exists in database
    const user = await Accounts.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({ status: "failed", message: "Invalid token" });
  }
};

export default auth;
