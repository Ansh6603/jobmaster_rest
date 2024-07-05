const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    chatName: {
        type: String, trim: true
    },
    isGroupChat: {
        type: Boolean, default: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    latestMessage: {
        type: mongoose.Schema.ObjectId,
        ref:"Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
}, { timestamp: true });

module.exports = mongoose.model("Chat", chatSchema);
