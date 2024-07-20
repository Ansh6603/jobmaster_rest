const mongoose = require("mongoose");
const BookMarkSchema = new mongoose.Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref:"Job" },
        userId: { type: String, required: true },
        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
    }, { timestamp: true }
);
module.exports = mongoose.model("Bookmark", BookMarkSchema)
