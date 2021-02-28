 var express = require('express')
 var comments = ['苹果','梨子','西红柿',"葡萄"]
 var Student = require('./mongo')
 // 用来包装路由
 // 1.挂载一个router路由
 var router = express.Router()
 // 2.把路由放在容器中
 router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Not Found 404.')
         }
        // console.log(data)
         res.render('index.html', {
             comments: comments,
             students: students
         })
     })    
 })
//渲染和post添加是分开的
 router.get('/students/new', function (req, res) {
    res.render('new.html')
 })
 router.post('/students/new', function (req, res) {
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Not Found 404.')
         }
    })
    res.redirect('/students')
 })

 router.get('/students/edit', function (req, res) {
     Student.findById((req.query.id.replace(/"/g, '')), function (err, student) {
         if (err) {
             return res.status(500).send('Not Found 404.')
         }
         res.render('edit.html', {
             student: student
         })
     })
 })
 router.post('/students/edit', function (req, res) {
    // 1.获取表单数据
    // 2.更新数据
    // 3.发送响应
    Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''), req.body, function (err) {
        if (err) {
            return res.status(500).send('Not Found 404.')
        }
        res.redirect('/students')
    })
 })
 router.get('/students/detele', function (req, res) {
     Student.findByIdAndRemove(req.query.id.replace(/"/g, ''), function (err) {
        if (err) {
            return res.status(500).send('Not Found 404.')
        }
        res.redirect('/students')
     })
 })
 // 把router导出
 module.exports = router