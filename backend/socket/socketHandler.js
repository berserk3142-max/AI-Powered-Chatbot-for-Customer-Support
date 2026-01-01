const { searchKB } = require("../services/kbService");
const { askAI, isConfigured } = require("../services/openaiService");
const Chat = require("../models/Chat");
const { v4: uuidv4 } = require("uuid");

module.exports = (io) => {
    const activeSessions = new Map();

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("initSession", (data) => {
            const sessionId = data?.sessionId || uuidv4();
            const userId = data?.userId || uuidv4();

            activeSessions.set(socket.id, { sessionId, userId });
            socket.join(sessionId);

            socket.emit("sessionInitialized", {
                sessionId,
                userId,
                message: "Session initialized successfully"
            });

            console.log(`Session initialized: ${sessionId}`);
        });

        socket.on("sendMessage", async (data) => {
            const { message, userId, sessionId } = data;
            const session = activeSessions.get(socket.id) || {
                userId: userId || uuidv4(),
                sessionId: sessionId || uuidv4()
            };

            try {
                io.to(session.sessionId).emit("receiveMessage", {
                    role: "user",
                    content: message,
                    timestamp: new Date(),
                    userId: session.userId
                });

                io.to(session.sessionId).emit("typing", { isTyping: true });

                let chat = await Chat.findOne({ sessionId: session.sessionId });

                if (!chat) {
                    chat = new Chat({
                        userId: session.userId,
                        sessionId: session.sessionId,
                        messages: []
                    });
                }

                chat.messages.push({
                    role: "user",
                    content: message,
                    source: "user",
                    timestamp: new Date()
                });

                let reply;
                let source = "kb";
                const kbResult = searchKB(message);

                if (kbResult) {
                    reply = kbResult.response;
                    source = "kb";
                    chat.metadata.kbHitsCount += 1;
                } else if (isConfigured()) {
                    const contextMessages = chat.messages.slice(-6);
                    const aiResult = await askAI(contextMessages);
                    reply = aiResult.content;
                    source = "ai";
                    chat.metadata.aiCallsCount += 1;
                } else {
                    reply = "I'd love to help you with that! 🤔 For detailed assistance, please contact our support team or try asking about pricing, refunds, features, or support hours.";
                    source = "kb";
                }

                chat.messages.push({
                    role: "assistant",
                    content: reply,
                    source,
                    timestamp: new Date()
                });

                await chat.save();

                io.to(session.sessionId).emit("typing", { isTyping: false });

                io.to(session.sessionId).emit("receiveMessage", {
                    role: "assistant",
                    content: reply,
                    source,
                    timestamp: new Date()
                });

            } catch (error) {
                console.error("Socket message error:", error);

                io.to(session.sessionId).emit("typing", { isTyping: false });

                socket.emit("error", {
                    message: "Failed to process message",
                    error: error.message
                });
            }
        });

        socket.on("disconnect", () => {
            const session = activeSessions.get(socket.id);
            if (session) {
                activeSessions.delete(socket.id);
                console.log(`Client disconnected: ${socket.id}, Session: ${session.sessionId}`);
            }
        });

        socket.on("userTyping", (data) => {
            const session = activeSessions.get(socket.id);
            if (session) {
                socket.to(session.sessionId).emit("userTyping", {
                    userId: session.userId,
                    isTyping: data.isTyping
                });
            }
        });
    });
};
