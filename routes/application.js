const router = require('express').Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/apply', verifyToken, applicationController.applyForJob);

module.exports = router;
