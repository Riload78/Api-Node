const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require('./handlePropertiesEngine')
const propertiesKey = getProperties()

/**
 * Debes de pasar el ususario
 * @param {*} user
 **/
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role
    }, JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )
  return sign
}
/**
 * Debes de pasar el token de sesion -> el JWT
 * @param {*} user
 * @returns
 **/
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return error
  }
}

module.exports = { tokenSign, verifyToken }
