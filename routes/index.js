var express = require('express');
var router = express.Router();

/*公共方法集中引入文件*/
/*
*引入公共导航栏方法——getNav()
*
*/
var comMe = require('./common');

var indexDao = require('../dao/indexDao');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '乐美首页' , layout:'./components/nav' , msg:'欢迎来到乐美生活' });
});

//nav getter
router.post('/menu',function(req,res,next){
	comMe.getNav(req,res);
})

// 增加用户
//TODO 同时支持get,post
router.post('/queryID', function(req, res, next) {
  	indexDao.queryById(req, res, next);
});

router.post('/queryAll', function(req, res, next) {
  	indexDao.userInfo(req,res);
});

module.exports = router;
