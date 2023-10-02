const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false // evita que se muestre en la api
    },
    role: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true, // genera el createdAt, updateAt
    versionKey: false
  }
)
// overwrite actions Mongoose
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('users', UserSchema)
