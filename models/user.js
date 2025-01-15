const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { Schema } = mongoose;
const { createTokenForUser } = require("../services/authentication");

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model(
  "User",
  new Schema(
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      salt: { type: String },
      password: { type: String, required: true },
      profileImageURL: { type: String, default: "./images/profile.png" },
      role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    },
    { timestamps: true }
  ).pre("save", function (next) {
    const user = this;

    // Only hash the password if it is new or modified
    if (!user.isModified("password")) return next();

    // Generate salt and hash the password
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    next();
  }).static("matchPasswordGenerateToken", async function (email, password) {
    console.log("Matching email:", email);

    // Find user by email
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    const { salt, password: hashedPassword } = user;

    // Hash the provided password with the stored salt
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    // Compare the hashed passwords
    if (hashedPassword !== userProvidedHash) {
      console.error("Password mismatch for email:", email);
      throw new Error("Incorrect password");
    }
    const token = createTokenForUser(user);
    return token;
  })
);

module.exports = User;
