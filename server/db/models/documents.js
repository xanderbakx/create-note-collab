const mongoose = require('mongoose');

const { Schema } = mongoose;

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
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
