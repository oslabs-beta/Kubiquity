const express = require('express');
const errorsController = require('../controllers/errorsController');

const router = express.Router();

router.get(
  '/',
  errorsController.queryErrors,
  errorsController.formatErrors,
  errorsController.saveErrors,
  errorsController.getErrors,
  (req, res) => (
    res.status(200).json(res.locals.errors)
  )
);

router.get(
  '/test',
  errorsController.getErrors,
  (req, res) => (
    res.status(200).json(res.locals.errors)
  )
);

module.exports = router;
