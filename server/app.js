const express = require('express')
const app = express()

app.set('secret', 'i2u34y12oi3u4y8')
app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态文件托管

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('App running at: http://localhost:3000')
})
