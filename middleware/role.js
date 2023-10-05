const { handleHttpError } = require('../utils/handleError')
/**
 * Array con roles permitidos
 * @param {*} roles
 * @returns
 * **/
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req
    console.log(user)
    const rolesByUser = user.role
    const checkValueRole = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // return truu or false
    if (!checkValueRole) {
      handleHttpError(res, 'USER NOT HAVE PERMISSION', 403)
      return
    }
    next()
  } catch (error) {
    handleHttpError(res, 'EROR_PERMISION', 403)
  }
}

module.exports = checkRol
