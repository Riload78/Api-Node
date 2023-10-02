const express = require('express')
const fs = require('fs')
const router = express.Router()
const PATH_ROUTES = __dirname

const removeExtension = (fileName) => {
  // eliminar la extensión .js
  return fileName.split('.').shift()
}
const files = fs.readdirSync(PATH_ROUTES)

files.filter((file) => {
  const name = removeExtension(file)
  let route = ''

  if (name !== 'index') {
    route = router.use(`/${name}`, require(`./${name}`))
  }

  return route
})

module.exports = router
