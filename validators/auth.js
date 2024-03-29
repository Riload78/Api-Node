const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorRegisterItem = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('age').exists().notEmpty().isNumeric(),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorLogin = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorRegisterItem, validatorLogin }
