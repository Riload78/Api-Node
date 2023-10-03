const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handlerJwt')
const { usersModel } = require('../model')

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'NEED_SSESION_NOT_TOKEN', 401)
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)
    if (!dataToken) {
      handleHttpError(res, 'ERROR_ID_TOKEN', 401)
      return
    }
    const user = await usersModel.findById(dataToken)
    req.user = user
    next()
  } catch (e) {
    handleHttpError(res, 'NOT SESSION', 401)
  }
}

module.exports = authMiddleware
