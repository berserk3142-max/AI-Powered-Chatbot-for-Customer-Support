/**
 * Analytics Routes
 * API endpoints for analytics dashboard
 */

const express = require("express");
const router = express.Router();
const {
    getOverview,
    getMessageStats,
    getSourceStats,
    getTopQueries,
    getHourlyActivity
} = require("../controllers/analyticsController");

// Get overall analytics overview
router.get("/overview", getOverview);

// Get message distribution stats
router.get("/messages", getMessageStats);

// Get response source stats (AI vs KB)
router.get("/sources", getSourceStats);

// Get top user queries
router.get("/top-queries", getTopQueries);

// Get hourly activity distribution
router.get("/hourly", getHourlyActivity);

module.exports = router;
