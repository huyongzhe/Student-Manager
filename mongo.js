 var mongoose = require('mongoose')

 mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true, useUnifiedTopology: true})

 var Schema = mongoose.Schema
 var studentSchema =  new Schema({
    name: {
        type: String,
        //表示不能是空
        required: true
    },
    gender: {
        type: Number,
        //枚举只能是0和1
        enum: [0, 1],
        //默认是0
        default: 0
    }, 
    age: {
        type: Number
    }, 
    hobbies: {
        type: String
    }
 })

 //导出模型构造函数
 module.exports = mongoose.model('Students', studentSchema)