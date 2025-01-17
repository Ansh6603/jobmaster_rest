const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");

module.exports = {
    createBookmark: async (req, res) => {
        const jobID = req.body.job;
        try {
            const job = await Job.findById(jobID);
            if (!job) {
                return res.status(404).json({ error: "Job Not found" });
            }
            const newBook = new Bookmark({
                job: job,
                userId: req.user.id,
            });
            const savedBookMark = await newBook.save();
            const { __v, updatedAt, ...newBookMarkInfo } = savedBookMark._doc;
            res.status(201).json(newBookMarkInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBookmark: async (req, res) => {
        try {
            const userId = req.user.id;
            const jobId = req.params.id;
            const deletedBookmark = await Bookmark.findOneAndDelete({ userId, job: jobId });

            if (!deletedBookmark) {
                return res.status(404).json({ error: "Bookmark not found" });
            }

            res.status(200).json("Bookmark successfully deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.user.id }).populate('job');
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
