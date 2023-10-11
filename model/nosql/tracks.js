const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    album: {
      type: String
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true
        },
        message: 'ERROR_URL'
      }
    },
    artist: {
      name: {
        type: String
      },
      nickname: {
        type: String
      },
      nationality: {
        type: String
      }
    },
    duration: {
      start: {
        type: Number
      },
      end: {
        type: Number
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true, // genera el createdAt, updateAt
    versionKey: false
  }
)

/**
 * Implementar relacion a storage
 **/

TracksSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    }
  ])
  console.log('entro')

  return joinData
}

// overwrite actions Mongoose
TracksSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('tracks', TracksSchema)
