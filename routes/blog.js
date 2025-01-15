const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const User = require("../models/user"); 
const router = Router();

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const fileExt = path.extname(originalName);
    const baseName = path.basename(originalName, fileExt);

    // Set the unique file name
    cb(null, timestamp + '-' + baseName + fileExt);
  }
});

const upload = multer({ storage: storage });

// GET route for adding a blog
router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

// POST route for submitting the form
router.post("/", upload.single("coverImage"), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file); // This should log the uploaded file details

  if (!req.file) {
    console.log("No file uploaded.");
    return res.status(400).send("No file uploaded.");
  }

  const newBlog = new Blog({
    title: req.body.title,
    body: req.body.body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });

  newBlog
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error saving blog:", error);
      res.status(500).send("Something went wrong!");
    });
});

// Route to fetch and display a particular blog by ID
router.get("/:id", async (req, res) => {
  try {
    // Use populate to fetch the user details
    const blog = await Blog.findById(req.params.id).populate("createdBy");
console.log("blog",blog);

    if (!blog) {
      return res.status(404).send("Blog not found.");
    }

    res.render("viewBlog", { blog, user: req.user });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send("Something went wrong.");
  }
});


module.exports = router;
