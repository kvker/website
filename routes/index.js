var express = require('express')
var router = express.Router()

const metaData = {
  title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
  description: '独立开发者污斑兔的个人空间，作品集合、技能表达、远程联系、兼职支持。',
  keywords: '独立开发者, 前端, node.js, 远程工作, 无代码游戏开发, 鸿蒙开发',
  author: '污斑兔, wubantu, ubuntu'
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', metaData)
})

router.get('/about', function (req, res, next) {
  res.render('about', metaData)
})

router.get('/projects', function (req, res, next) {
  res.render('projects', metaData)
})

router.get('/uses', function (req, res, next) {
  res.render('uses', metaData)
})

module.exports = router
