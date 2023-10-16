const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/authRoute"); // Import your user routes file
const blogRoutes = require("./routes/blogRoute"); // Import your blog routes file
const commentRoutes = require("./routes/commentRoute"); // Import your comment routes file
const { configDotenv } = require("dotenv");
configDotenv();

const PORT = process.env.PORT;
const MongoUri = process.env.MONGOURI;
const app = express();
app.use(express.json());
app.use(cors());

// Mongoose connection setup
mongoose
  .connect(MongoUri)
  .then(() => {
    console.log("Mongo is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Mount the user routes
app.use("/api/auth", userRoutes);

// Mount the blog routes
app.use("/api/blogs", blogRoutes);

// Mount the comment routes
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
