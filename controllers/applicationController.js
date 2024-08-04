const Application = require('../models/Application');
const Job = require('../models/Job');

module.exports = {
  applyForJob: async (req, res) => {
    const { jobId, resumeUrl } = req.body;
    const userId = req.user.id;

    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      const existingApplication = await Application.findOne({ jobId, userId });
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      const newApplication = new Application({
        jobId,
        userId,
        resumeUrl,
        isApplied: true 
      });

      const savedApplication = await newApplication.save();

      res.status(201).json({
        message: 'Successfully applied for the job',
        application: savedApplication
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};
