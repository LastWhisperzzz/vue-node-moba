const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    title: { type: String, required: true },
    content: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Article', schema)
