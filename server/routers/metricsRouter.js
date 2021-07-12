const express = require('express');
const metricsController = require('../controllers/metricsController');

const router = express.Router();

router.get(
  '/', 
  metricsController.getMemory, 
  metricsController.getCPU,
  (req, res) => res.status(200).json(res.locals.memory)
);

module.exports = router;
