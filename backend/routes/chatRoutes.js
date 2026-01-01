/**
 * Chat Routes
 * API endpoints for chat functionality
 */

const express = require("express");
const router = express.Router();
const {
    handleMessage,
    getHistory,
    getSession,
    clearHistory,
    createSession
} = require("../controllers/chatController");

// Send a message and get response
router.post("/message", handleMessage);

// Start a new chat session
router.post("/session", createSession);

// Get chat session by ID
router.get("/session/:sessionId", getSession);

// Get chat history for a user
router.get("/history/:userId", getHistory);

// Clear chat history for a user
router.delete("/history/:userId", clearHistory);

module.exports = router;
