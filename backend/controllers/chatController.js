/**
 * Chat Controller
 * Handles message processing with KB + AI fallback
 * Maintains conversation context
 */

const Chat = require("../models/Chat");
const { searchKB } = require("../services/kbService");
const { askAI, isConfigured } = require("../services/openaiService");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

// In-memory storage fallback when MongoDB is not available
const inMemoryChats = new Map();

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Handle incoming chat message
 * POST /api/chat/message
 */
exports.handleMessage = async (req, res) => {
    try {
        const { userId, message, sessionId } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        // Generate userId if not provided
        const finalUserId = userId || uuidv4();
        const finalSessionId = sessionId || uuidv4();

        let chat;
        let messages = [];
        let metadata = { aiCallsCount: 0, kbHitsCount: 0, totalMessages: 0 };

        if (isMongoConnected()) {
            // Use MongoDB
            chat = await Chat.findOne({
                userId: finalUserId,
                sessionId: finalSessionId
            });

            if (!chat) {
                chat = new Chat({
                    userId: finalUserId,
                    sessionId: finalSessionId,
                    messages: [],
                    metadata: { aiCallsCount: 0, kbHitsCount: 0, totalMessages: 0 }
                });
            }
            messages = chat.messages;
            metadata = chat.metadata;
        } else {
            // Use in-memory storage
            const chatKey = `${finalUserId}_${finalSessionId}`;
            if (inMemoryChats.has(chatKey)) {
                const stored = inMemoryChats.get(chatKey);
                messages = stored.messages;
                metadata = stored.metadata;
            }
        }

        // Add user message
        messages.push({
            role: "user",
            content: message.trim(),
            source: "user",
            timestamp: new Date()
        });

        // Try knowledge base first
        let reply;
        let source = "kb";
        const kbResult = searchKB(message);

        if (kbResult) {
            reply = kbResult.response;
            source = "kb";
            metadata.kbHitsCount += 1;
        } else {
            // Fallback to AI
            if (isConfigured()) {
                // Get last 6 messages for context (industry standard)
                const contextMessages = messages.slice(-6);
                const aiResult = await askAI(contextMessages);
                reply = aiResult.content;
                source = "ai";
                metadata.aiCallsCount += 1;
            } else {
                // AI not configured - provide fallback
                reply = "I'd love to help you with that! 🤔 For detailed assistance, please contact our support team at support@example.com or try asking about our pricing, refunds, features, or support hours.";
                source = "kb";
            }
        }

        // Add assistant response
        messages.push({
            role: "assistant",
            content: reply,
            source,
            timestamp: new Date()
        });

        // Save chat
        if (isMongoConnected()) {
            chat.messages = messages;
            chat.metadata = metadata;
            await chat.save();
        } else {
            const chatKey = `${finalUserId}_${finalSessionId}`;
            inMemoryChats.set(chatKey, { messages, metadata, userId: finalUserId, sessionId: finalSessionId });
        }

        res.json({
            reply,
            source,
            userId: finalUserId,
            sessionId: finalSessionId,
            messageCount: messages.length
        });

    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({
            error: "Failed to process message",
            details: error.message
        });
    }
};


/**
 * Get chat history
 * GET /api/chat/history/:userId
 */
exports.getHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const { sessionId } = req.query;

        let query = { userId };
        if (sessionId) {
            query.sessionId = sessionId;
        }

        const chats = await Chat.find(query)
            .sort({ updatedAt: -1 })
            .limit(10);

        res.json({
            chats,
            count: chats.length
        });

    } catch (error) {
        console.error("History error:", error);
        res.status(500).json({
            error: "Failed to fetch history"
        });
    }
};

/**
 * Get single chat session
 * GET /api/chat/session/:sessionId
 */
exports.getSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const chat = await Chat.findOne({ sessionId });

        if (!chat) {
            return res.status(404).json({
                error: "Session not found"
            });
        }

        res.json({ chat });

    } catch (error) {
        console.error("Session error:", error);
        res.status(500).json({
            error: "Failed to fetch session"
        });
    }
};

/**
 * Clear chat history
 * DELETE /api/chat/history/:userId
 */
exports.clearHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        await Chat.deleteMany({ userId });

        res.json({
            message: "History cleared",
            userId
        });

    } catch (error) {
        console.error("Clear error:", error);
        res.status(500).json({
            error: "Failed to clear history"
        });
    }
};

/**
 * Start new session
 * POST /api/chat/session
 */
exports.createSession = async (req, res) => {
    try {
        const { userId } = req.body;

        const finalUserId = userId || uuidv4();
        const sessionId = uuidv4();

        const welcomeMessage = {
            role: "assistant",
            content: "👋 Hello! Welcome to our support chat. I'm here to help you with any questions about our product, pricing, account issues, or technical support. How can I assist you today?",
            source: "kb",
            timestamp: new Date()
        };

        if (isMongoConnected()) {
            const chat = new Chat({
                userId: finalUserId,
                sessionId,
                messages: [welcomeMessage]
            });
            await chat.save();
        } else {
            const chatKey = `${finalUserId}_${sessionId}`;
            inMemoryChats.set(chatKey, {
                messages: [welcomeMessage],
                metadata: { aiCallsCount: 0, kbHitsCount: 0, totalMessages: 1 },
                userId: finalUserId,
                sessionId
            });
        }

        res.json({
            sessionId,
            userId: finalUserId,
            welcomeMessage: welcomeMessage.content
        });

    } catch (error) {
        console.error("Session create error:", error);
        res.status(500).json({
            error: "Failed to create session"
        });
    }
};

