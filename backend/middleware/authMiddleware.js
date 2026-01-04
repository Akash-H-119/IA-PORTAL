const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    try {
      // 🔐 VERIFY TOKEN HERE
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET   // ✅ SAME JWT SECRET USED HERE
      );

      // Role-based protection
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
