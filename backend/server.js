import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Gen Alpha API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Basic API info
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Gen Alpha API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Gen Alpha server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 API docs: http://localhost:${PORT}/api`);
});

export default app;
