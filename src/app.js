const express = require("express");
const cors = require("cors");

const deviceRoutes = require("./routes/device.routes");
const messageRoutes = require("./routes/message.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("RAT Backend is running");
});

// Routes
app.use("/api/device", deviceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

module.exports = app;
