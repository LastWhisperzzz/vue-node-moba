const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 密码不会被查询
    set(val) {
      return require('bcryptjs').hashSync(val, 10) // 散列加密
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
