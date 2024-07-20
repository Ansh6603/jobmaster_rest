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
                job: job._id,
                userId: req.user.id,
                title: job.title,
                imageUrl: job.imageUrl,
                company: job.company,
                location: job.location
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
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(201).json("BookMark Successfully Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.params.userId });
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
