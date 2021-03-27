const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    body: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
)

const Document = mongoose.model('Document', documentSchema)
module.exports = Document
