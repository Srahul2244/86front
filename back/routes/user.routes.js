const express = require("express");
const userRoutes = express.Router();
const { User } = require("../models/user.model");

// Create User
userRoutes.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get User by ID
userRoutes.get("/:id", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// // Get User
userRoutes.get("/all", async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await User.find();
    // console.log("Users:", users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(404).json({ error: "Users not found" });
  }
});

// Update User
userRoutes.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete User
userRoutes.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// Analytics: Total Number of Users
userRoutes.get("/analytics/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ total_users: totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics: Top Active Users
userRoutes.get("/analytics/users/top-active", async (req, res) => {
  try {
    const topActiveUsers = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
        },
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(topActiveUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRoutes;
