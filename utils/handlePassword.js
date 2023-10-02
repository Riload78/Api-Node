const bcryptjs = require('bcryptjs')

/**
* Contraseña sin encriptar
* @param {*} passwordPlain
**/
const encrypt = async (passwodrPlain) => {
  const hash = await bcryptjs.hash(passwodrPlain, 10) // orden de aletoriedad
  return hash
}

/**
* Contraseña sin encriptar y contraseña encriptada
* @param {*} passwordPlain
* @param {*} hashPassword
**/
const compare = async (passwodrPlain, hashPassword) => {
  return await bcryptjs.compare(passwodrPlain, hashPassword)
}

module.exports = { encrypt, compare }
