const Application = require('../models/Application');
const Job = require('../models/Job');

module.exports = {
  applyForJob: async (req, res) => {
    const { jobId, resumeUrl } = req.body;
    const userId = req.user.id; 
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json('Job not found');
      }

      const newApplication = new Application({
        jobId,
        userId,
        resumeUrl
      });

      const savedApplication = await newApplication.save();

      res.status(201).json({
        message: 'Successfully applied for the job',
        application: savedApplication
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
