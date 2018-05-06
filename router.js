//module.exports = function(app){

var fs = require('fs')
var Student = require('./student')

/*Student.updateById({
	id:1,
	name:'章小事'
},function(err){
	if(err){
		return console.log('修改失败')
	}
	console.log('修改成功')
})*/


// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

router.get('/students',function (req,res) {

	/*fs.readFile('./db.json', 'utf8',function(err,data){
	if (err){
		return res.status(500),send('Sever error')
	}
	res.render('index.html', {
		//从文件从读取到的文件一定是字符串，所以从这里一定要手动转成对象
     students:JSON.parse(data).students

	})*/

	Student.find(function(err,students){
		if(err){
			return res.status(500),send('Sever error')
		}
		res.render('index.html', {
       
           students: students
    })
	})
})


router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new', function (req, res) {
 //填表单提交数据  1.获取表单数据 ，
 //2，处理（将数据保存到db.json 文件中用以持久化）  3，发送响应 
 //先读取出来，转对象，然后往对象push数据，然后对象转为字符串，然后再把字符串写入文件
    ///
        // 修改在这  
        new Student(req.body).save( function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  
   })
})
/*
 * 渲染添加学生页面
 */
router.get('/students/edit',function (req,res) {
	 // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
  // 2. 获取要编辑的学生 id
  // 
  // 3. 渲染编辑页面
  //    根据 id 把学生信息查出来
  //    使用模板引擎渲染页面
   // replace
  //    字符串模式
  //      简单，但是不支持全局和忽略大小写问题
  //    正则表达式模式
  //      强大，支持全局和忽略大小写

  Student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

//处理编辑学生
router.post('/students/edit',function (req,res) {
	// 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Student.updateById()
  // 3. 发送响应
  var id=req.body.id.replace(/"/g, '')
 Student.findByIdAndUpdate(id,req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })

})

/*
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
  // 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据
  var id = req.query.id.replace(/"/g, '')
	Student.findByIdAndRemove(id,function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

// 3. 把 router 导出
module.exports = router