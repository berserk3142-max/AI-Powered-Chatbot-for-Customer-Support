/**
 * Analytics Controller
 * Provides metrics and insights for dashboard
 */

const Chat = require("../models/Chat");
const { getStats: getKBStats } = require("../services/kbService");

/**
 * Get overall analytics
 * GET /api/analytics/overview
 */
exports.getOverview = async (req, res) => {
    try {
        // Total conversations
        const totalConversations = await Chat.countDocuments();

        // Total messages
        const messageStats = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $group: {
                    _id: null,
                    totalMessages: { $sum: 1 },
                    userMessages: {
                        $sum: { $cond: [{ $eq: ["$messages.role", "user"] }, 1, 0] }
                    },
                    assistantMessages: {
                        $sum: { $cond: [{ $eq: ["$messages.role", "assistant"] }, 1, 0] }
                    }
                }
            }
        ]);

        // AI vs KB usage
        const sourceStats = await Chat.aggregate([
            {
                $group: {
                    _id: null,
                    totalAICalls: { $sum: "$metadata.aiCallsCount" },
                    totalKBHits: { $sum: "$metadata.kbHitsCount" }
                }
            }
        ]);

        // Recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentActivity = await Chat.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // KB stats
        const kbStats = getKBStats();

        res.json({
            overview: {
                totalConversations,
                totalMessages: messageStats[0]?.totalMessages || 0,
                userMessages: messageStats[0]?.userMessages || 0,
                assistantMessages: messageStats[0]?.assistantMessages || 0
            },
            sources: {
                aiCalls: sourceStats[0]?.totalAICalls || 0,
                kbHits: sourceStats[0]?.totalKBHits || 0,
                aiFallbackRate: sourceStats[0]
                    ? (sourceStats[0].totalAICalls /
                        (sourceStats[0].totalAICalls + sourceStats[0].totalKBHits) * 100
                    ).toFixed(1)
                    : 0
            },
            recentActivity,
            knowledgeBase: kbStats
        });

    } catch (error) {
        console.error("Analytics error:", error);
        res.status(500).json({
            error: "Failed to fetch analytics"
        });
    }
};

/**
 * Get message distribution by role
 * GET /api/analytics/messages
 */
exports.getMessageStats = async (req, res) => {
    try {
        const stats = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $group: {
                    _id: "$messages.role",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({ stats });

    } catch (error) {
        console.error("Message stats error:", error);
        res.status(500).json({
            error: "Failed to fetch message stats"
        });
    }
};

/**
 * Get response source distribution
 * GET /api/analytics/sources
 */
exports.getSourceStats = async (req, res) => {
    try {
        const stats = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { "messages.role": "assistant" } },
            {
                $group: {
                    _id: "$messages.source",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({ stats });

    } catch (error) {
        console.error("Source stats error:", error);
        res.status(500).json({
            error: "Failed to fetch source stats"
        });
    }
};

/**
 * Get top queries (most common user messages)
 * GET /api/analytics/top-queries
 */
exports.getTopQueries = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const queries = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { "messages.role": "user" } },
            {
                $group: {
                    _id: { $toLower: "$messages.content" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: limit }
        ]);

        res.json({ queries });

    } catch (error) {
        console.error("Top queries error:", error);
        res.status(500).json({
            error: "Failed to fetch top queries"
        });
    }
};

/**
 * Get hourly activity distribution
 * GET /api/analytics/hourly
 */
exports.getHourlyActivity = async (req, res) => {
    try {
        const hourlyStats = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $group: {
                    _id: { $hour: "$messages.timestamp" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ hourlyStats });

    } catch (error) {
        console.error("Hourly stats error:", error);
        res.status(500).json({
            error: "Failed to fetch hourly stats"
        });
    }
};
