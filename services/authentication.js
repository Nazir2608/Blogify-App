const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// Load the secret key from environment variables for better security
const secret = process.env.JWT_SECRET || "$UPERMAN"; // Fallback to hardcoded secret if not set in .env (Not recommended for production)

/**
 * Create a JWT token for a user.
 * - Generates a token containing user details for authentication and authorization.
 * - The payload includes non-sensitive user information such as:
 *   - `_id`: User's unique identifier
 *   - `fullName`: Full name of the user
 *   - `email`: Email address of the user
 *   - `profileImageURL`: URL of the user's profile image
 *   - `role`: Role of the user (e.g., USER, ADMIN)
 *
 * @param {Object} user - User object containing user details.
 * @returns {string} - Signed JWT token.
 */
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  // Sign the token with the secret key
  const token = jwt.sign(payload, secret);
  return token;
}

/**
 * Validate a JWT token.
 * - Verifies the provided token using the secret key.
 * - Decodes and returns the payload if the token is valid.
 *
 * @param {string} token - The JWT token to validate.
 * @returns {Object} - Decoded payload from the token.
 * @throws {Error} - If the token is invalid or expired.
 */
function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
