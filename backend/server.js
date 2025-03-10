// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const applicantRoutes = require("./routes/applicantRoutes");

const app = express();
app.use(cors({
  origin: [
    'https://vitaextract.netlify.app', 
    'http://localhost:5173'                   
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", applicantRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));