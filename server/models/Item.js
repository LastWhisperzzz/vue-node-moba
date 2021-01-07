const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  price: { type: Number },
  grade: { type: Number }, // 1:普通 2:史诗 3:传说 4:神话
  desc: { type: String }
})

module.exports = mongoose.model('Item', schema)
