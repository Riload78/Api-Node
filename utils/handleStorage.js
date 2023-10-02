const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStore = path.join(__dirname, '../storage')
    cb(null, pathStore)
  },
  filename: (req, file, cb) => {
    // TODO .pdf .png .jpg
    const ext = file.originalname.split('.').pop() // ultimo valor del array
    const filename = `file-${Date.now()}.${ext}`
    cb(null, filename)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware
