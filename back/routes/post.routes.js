const express = require("express");
const postRoutes = express.Router();
const { Post } = require("../models/post.model");

// Create Post
postRoutes.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get post
postRoutes.get("/post", async (req, res) => {
  try {
    const post = await Post.find();
    console.log(post);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "post not found" });
  }
});

// Get Post by ID
postRoutes.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});

// Update Post
postRoutes.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});

// Delete Post
postRoutes.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});

postRoutes.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike Post
postRoutes.post("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes = Math.max(post.likes - 1, 0);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics: Total Number of Posts
postRoutes.get("/analytics/posts", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    res.json({ total_posts: totalPosts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics: Top Liked Posts
postRoutes.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const topLikedPosts = await Post.find()
      .sort({ likes: -1 })
      .limit(5);
    res.json(topLikedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = postRoutes;
