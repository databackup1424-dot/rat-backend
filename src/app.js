const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/health", (req, res) => {
  return res.json({ success: true, status: "ok" });
});

// ADMIN ROUTES
app.use("/admin", require("./routes/admin.routes"));
app.use("/admin", require("./routes/admin.users.routes"));

// API ROUTES
app.use("/api/device", require("./routes/device.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));

module.exports = app;
