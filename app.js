 var express = require('express')
  // 把路由挂载到app上 
 var router = require('./router')
 var bodyParser = require('body-parser')
 var app = express()
 app.use('/node_modules/', express.static('./node_modules/')) 
 app.use('/public/', express.static('./public/'))
 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
 app.use(bodyParser.json())
 app.engine('html', require('express-art-template'))
 app.use(router)
 app.listen(3000, function () {
     console.log('Server is running...')
 })
 module.exports = app