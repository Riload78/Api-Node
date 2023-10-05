require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT ?? 3000
const dbConnect = require('./config/mongo')
const { dbConnectMySql } = require('./config/mysql')
const routers = require('./router')
const app = express()
const loggerStream = require('./utils/handleLogger')
const morganBody = require('morgan-body')
const ENGINE_DB = process.env.ENGINE_DB

/**
 * Middelware
 * **/
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: (req, res) => {
    return res.statusCode < 400
  }

})
/*
* Aqui invocamos a las rutas de forma dinamica
*/
app.use('/api', routers)

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`)
})
// conexión a la  BBDD

ENGINE_DB === 'nosql' ? dbConnect() : dbConnectMySql()
