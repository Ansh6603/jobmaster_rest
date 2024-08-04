const router = require('express').Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/apply', verifyToken, applicationController.applyForJob);

router.get('/appliedJobs', verifyToken, applicationController.getAppliedJobs);


module.exports = router;
