const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { usersModel } = require('../model')
const { tokenSign } = require('../utils/handlerJwt')
const { handleHttpError } = require('../utils/handleError')

/**
 * Es el encargado de registrar un usuasrio
 * @param {*} req
 * @param {*} res
 **/
const registerController = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    console.log(password)
    const body = { ...req, password }
    console.log(body)
    const dataUser = await usersModel.create(body)
    console.log('datauser:', dataUser)
    dataUser.set('password', undefined, { strict: false }) // sobreescribo la password para que no se muestre en la data
    console.log(dataUser)
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }
    return res.send({ data })
  } catch (error) {
    handleHttpError(res, error)
  }
}

/**
 * Es el encargado de loguear un usuasrio
 * @param {*} req
 * @param {*} res
 **/

const loginController = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await usersModel.findOne({ email: req.email }).select('password name email role') // el model not show password.  Whith select show password
    console.log(user)
    if (!user) {
      handleHttpError(res, 'ERROR_LOGIN_USER')
      return
    }

    const hashPassword = user.password
    console.log(hashPassword)
    const check = await compare(req.password, hashPassword)
    if (!check) {
      handleHttpError(res, 'PASSWORD_INVALID', 401)
      return
    }

    user.set('password', undefined, { strict: false })

    const data = {
      token: await tokenSign(user),
      user
    }

    res.send(data)
  } catch (error) {
    console.log(error)
    handleHttpError(res, `Error Login: ${error}`)
  }
}

module.exports = { registerController, loginController }
