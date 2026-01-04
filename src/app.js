const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

// ROUTES
app.use("/api/device", require("./routes/device.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));

module.exports = app;


