const { Router } = require("express");
const User = require("../models/User");
const router = Router();

/**
 * GET /signup
 * Render the sign-up page where users can create a new account.
 */
router.get("/signup", (req, res) => {
  return res.render("signup");
});

/**
 * POST /signup
 * Handle new user registration.
 * - Validates the request body for required fields.
 * - Creates a new user instance and saves it to the database.
 * - Redirects to the home page upon successful registration.
 */
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if all required fields are provided
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to the home page upon successful registration
    return res.redirect("/");
  } catch (err) {
    console.error("Validation Error:", err.errors); // Log validation errors
    return res.status(500).json({ message: "An error occurred while creating the user." });
  }
});

/**
 * GET /signin
 * Render the sign-in page where users can log in to their account.
 */
router.get("/signin", (req, res) => {
  return res.render("signin");
});

/**
 * POST /signin
 * Handle user login.
 * - Validates the request body for email and password.
 * - Checks user credentials and generates a JWT token upon successful authentication.
 * - Stores the token in a cookie and redirects to the home page.
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Authenticate the user by matching email and password
    const token = await User.matchPasswordGenerateToken(email, password);

    // Log user details (excluding sensitive info)
    console.log("Login successful. User details:", token);

    // Store the token in a cookie and redirect to the home page
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Login failed:", error.message);

    // Render the sign-in page with an error message on failure
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
});

/**
 * GET /logout
 * Handle user logout.
 * - Clears the authentication token cookie.
 * - Redirects to the home page.
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
