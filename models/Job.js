const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        company: { type: String, required: true },
        salary: { type: String, required: true },
        period: { type: String, required: true },
        contract: { type: String, required: true },
        requirement: { type: Array, required: true },
        imageUrl: { type: String, required: true },
        agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        isSuggested: { type: Boolean, default: false },
        minWorkExperience: { type: Number, required: true },
        maxWorkExperience: { type: Number, required: true },
        jobType: { type: String, required: true },
        workingDays: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
