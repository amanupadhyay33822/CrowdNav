const User = require("../models/Location");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "backend/config/.env" });

exports.isAuthenticated = async (req, res, next) => {
  try {
    //fetch tokenc
    const token =
      req.headers.authorization.replace("Bearer ", "") ||
      req.headers.cookie.replace("token=", "");

    //check for empty token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token required",
      });
    }

    //verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded._id);

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
