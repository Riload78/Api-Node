const express = require('express')
const router = express.Router()
const { validatorRegisterItem, validatorLogin } = require('../validators/auth')
const { registerController, loginController } = require('../controller/auth')

// TODO http://localhost:3001/api/auth/login
// TODO http://localhost:3001/api/auth/register

/****
* Get User
* @param {*} req
* @param {*} res
****/
router.post('/login', validatorLogin, loginController)

/****
* Create User
* @param {*} req
* @param {*} res
****/
router.post('/register', validatorRegisterItem, registerController)

module.exports = router
