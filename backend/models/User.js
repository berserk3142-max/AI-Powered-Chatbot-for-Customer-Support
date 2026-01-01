const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ododeId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        default: "Anonymous"
    },
    email: {
        type: String,
        sparse: true
    },
    avatar: {
        type: String,
        default: null
    },
    preferences: {
        theme: {
            type: String,
            enum: ["dark", "light"],
            default: "dark"
        },
        notifications: {
            type: Boolean,
            default: true
        }
    },
    stats: {
        totalConversations: {
            type: Number,
            default: 0
        },
        totalMessages: {
            type: Number,
            default: 0
        },
        lastActive: {
            type: Date,
            default: Date.now
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update last active on interaction
userSchema.methods.updateActivity = function () {
    this.stats.lastActive = new Date();
    return this.save();
};

module.exports = mongoose.model("User", userSchema);
