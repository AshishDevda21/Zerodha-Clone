const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // Normalize user id from JWT payload so routes can safely enforce ownership.
    req.userId = verified.id || verified._id;

    if (!req.userId) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

