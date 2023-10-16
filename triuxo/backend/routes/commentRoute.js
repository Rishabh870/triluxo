const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel"); // Import your Comment model here
const authenticateToken = require("../middleware");
const Blog = require("../models/blogModel");
// Route to add a comment
router.post("/comment", authenticateToken, async (req, res) => {
  try {
    const { text, blogId } = req.body; // Include the blogId in the request body

    // Create a new comment
    const newComment = new Comment({
      text,
      author: req.user.userId, // Use the user ID obtained from the middleware
    });

    // Save the comment to the database
    await newComment.save();

    // Update the blog's comments array with the new comment's ID
    const blog = await Blog.findById(blogId); // Assuming you have a Blog model
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.comments.push(newComment._id);
    await blog.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
