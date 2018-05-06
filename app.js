var express = require('express')


var bodyParser = require('body-parser')
var router = require('./router')
var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
//加载模板引擎
app.engine('html',require('express-art-template'))
//readFile 第二个参数是可选的。文件按照按照utf-8 格式
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//把路由容器加载到app服务中
app.use(router)

app.listen(3000,function(){
	console.log('running')
})

module.exports = app