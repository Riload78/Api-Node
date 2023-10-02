require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT ?? 3000
const dbConnect = require('./config/mongo')
const routers = require('./router')
const app = express()

/**
 * Middelware
 * **/
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))
/*
* Aqui invocamos a las rutas de forma dinamica
*/
app.use('/api', routers)

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`)
})
// conexión a la  BBDD
dbConnect()
