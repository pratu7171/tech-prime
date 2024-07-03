const jwt = require("jsonwebtoken");

// Authentication middleware
const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication failed: Token not found" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed: Invalid token" });
  }
};

module.exports = authenticate;



// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // Authentication middleware
// exports.auth = async (req, res, next) => {
//   try {
//     // Extract token from cookies, body, or Authorization header
//     let token = req.cookies.token || req.body.token || req.headers.authorization;

//     // Check if token is present and handle Bearer token format
//     // if (token && token.startsWith("Bearer ")) {
//     //   token = token.slice(7);

//     // If token is missing, return error response
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     // Verify the token
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Attach decoded user information to request object
//       next(); // Move to the next middleware or route handler
//     } catch (err) {
//       console.error(err);
//       return res.status(401).json({
//         success: false,
//         message: "Token is invalid",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({
//       success: false,
//       message: "Something went wrong while validating the token",
//     });
//   }
// };
