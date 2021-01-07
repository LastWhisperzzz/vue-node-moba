const express = require('express')
const app = express()

app.set('secret', 'i2u34y12oi3u4y8')
//跨域
app.use(require('cors')())
// 将请求转为json
app.use(express.json())
// 托管静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

// 连接数据库
require('./plugins/db')(app)
// 后台管理接口
require('./routes/admin')(app)
// 前端页面接口
require('./routes/web')(app)

// 错误处理函数
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

app.listen(3000, () => {
  console.log('App running at: http://localhost:3000')
})
