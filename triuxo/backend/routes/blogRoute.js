const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel"); // Import your Blog model here
const authenticateToken = require("../middleware");
const upload = require("../multer"); // Import the multer configuration

// Create a new blog with an image or video
router.post(
  "/blog",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      let imageUrl;
      if (req.file && req.file.path) {
        // If a file is uploaded

        imageUrl = req.file.path;
      }

      const newBlog = new Blog({
        title,
        content,
        author: req.user.userId,
        image: imageUrl, // Save the Cloudinary URL in the image field
      });

      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all blogs
router.get("/blog", async (req, res) => {
  try {
    const blogs = (await Blog.find().populate("author", "username")).reverse();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a blog by ID with comments populated
router.get("/blog/:id", async (req, res) => {
  try {
    console.log(req.params);
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new route for fetching comments by blog ID
router.get("/blog/:id/comments", async (req, res) => {
  try {
    // Find the blog post by ID and populate the comments
    const blog = await Blog.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "author", // Specify the path to the 'author' field in the 'comments' array
      },
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Extract and return the populated comments
    const comments = blog.comments.reverse();

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
