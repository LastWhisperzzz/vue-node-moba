const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
    select: false, // 密码不会被查询
    set(val) {
      return require('bcryptjs').hashSync(val, 10) // 散列加密
    }
  },
  level: { type: Number }, // 1:超级管理员 2:测试权限
  state: { type: Boolean, default: true } // false:禁用 true:可用
})

module.exports = mongoose.model('AdminUser', schema)
