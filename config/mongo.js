const mongoose = require('mongoose')

const dbConnect = () => {
  const DB_URI = process.env.DB_URI
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('******* MONGO DB RUNNIG ********'))
    .catch(e => console.log(`******* CONEXION ERROR:${e} **********`))
}

module.exports = dbConnect
