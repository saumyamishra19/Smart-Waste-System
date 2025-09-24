const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running!" });
});

// reports API
let reports = [];

app.post("/api/reports", (req, res) => {
  const { title, description } = req.body;
  const newReport = { id: reports.length + 1, title, description, status: "pending" };
  reports.push(newReport);
  res.status(201).json(newReport);
});

app.get("/api/reports", (req, res) => {
  res.json(reports);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
