const express = require('express');
const errorController = require('../controllers/errorController');

const router = express.Router();

//Get Request
router.get(
  '/',
  // errorController.clearErrors,
  errorController.queryErrors,
  errorController.formatErrors,
  errorController.saveErrors,
  errorController.getErrors,
  // more middleware
  (req, res) => res.status(200).json(res.locals.errors)
);

module.exports = router;