const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
