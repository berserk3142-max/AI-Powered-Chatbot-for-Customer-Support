const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true
  },
  messages: [
    {
      role: {
        type: String,
        enum: ["user", "assistant", "system"],
        required: true
      },
      content: {
        type: String,
        required: true
      },
      source: {
        type: String,
        enum: ["kb", "ai", "user"],
        default: "user"
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  metadata: {
    aiCallsCount: {
      type: Number,
      default: 0
    },
    kbHitsCount: {
      type: Number,
      default: 0
    },
    totalMessages: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
chatSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  this.metadata.totalMessages = this.messages.length;
  next();
});

module.exports = mongoose.model("Chat", chatSchema);
