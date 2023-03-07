const jwt = require("jsonwebtoken");

// Require authentication middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If there's no authorization header, return a 401 Unauthorized status code
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Split the authorization header into the type of token and the token itself
  const [type, token] = authHeader.split(" ");

  // If the type is not 'Bearer' or there's no token, return a 401 Unauthorized status code
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If there's an error verifying the token, return a 401 Unauthorized status code
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the token is valid, set the decoded payload as a property of the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  });
};

module.exports = { requireAuth };
