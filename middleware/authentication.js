const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      // No token cookie present, proceed to next middleware/route
      res.locals.user = null; // Ensure res.locals.user is set to null
      return next();
    }

    try {
      // Validate the token and attach user payload to the request and response locals
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload; // Attach user payload to req
      res.locals.user = userPayload; // Attach user payload to res.locals for views
      return next();
    } catch (error) {
      console.error("Token validation failed:", error.message);
      // Continue without a valid user
      res.locals.user = null; // Set res.locals.user to null if token is invalid
      return next();
    }
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
