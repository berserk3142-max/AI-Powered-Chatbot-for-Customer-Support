require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const socketHandler = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-powered-chatbot-for-customer-support-1.onrender.com",
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

const io = new Server(server, {
    cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
});

app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "🤖 AI Chatbot API",
        version: "1.0.0",
        endpoints: {
            chat: "/api/chat",
            analytics: "/api/analytics",
            health: "/api/health"
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        path: req.path
    });
});

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: err.message
    });
});

socketHandler(io);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ai-chatbot";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        console.log("⚠️  Server will run without database - using in-memory storage");
    });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🤖 AI Chatbot Backend Server                    ║
║                                                   ║
║   Server running on: http://localhost:${PORT}        ║
║   MongoDB URI: ${MONGO_URI.substring(0, 30)}...   ║
║   Socket.io: Enabled                              ║
║                                                   ║
║   Endpoints:                                      ║
║   - POST /api/chat/message                        ║
║   - POST /api/chat/session                        ║
║   - GET  /api/analytics/overview                  ║
║   - GET  /api/health                              ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received. Closing server...");
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log("Server closed.");
            process.exit(0);
        });
    });
});
