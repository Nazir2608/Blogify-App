const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog=require("./models/blog")
const { checkForAuthenticationCookie } = require("./middleware/authentication");

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((e) => console.error("MongoDB Connection Error:", e));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));

// Routes
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 }); // Sort blogs by creation date (descending order)
    res.render("home", { user: req.user, blogs: allBlogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).send("Something went wrong while fetching blogs!");
  }
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Error Handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
