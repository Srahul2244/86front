const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { connection } = require("./config/db");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.PORT, async () => {
  await connection;
  try {
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
});
