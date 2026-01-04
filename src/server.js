const app = require("./app");

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "rat-backend",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});


