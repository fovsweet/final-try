var express = require('express');
var router = express.Router();

var dataList = require('../staticdb/storedb');

/*公共方法集中引入文件*/
/*
*引入公共导航栏方法——getNav()
*
*/
var comMe = require('./common');

var indexDao = require('../dao/indexDao');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home/overview/index', { title: '乐美首页' , layout:'./components/nav' });
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

router.post('/home/overview/getdata',function(req,res,next){
	res.writeHead(200,{"content-type":"application/json"});
	if(req.body.dayNum == '-30'){
		res.write(JSON.stringify(dataList.getDatat));
	}else if(req.body.dayNum == '-7'){
		res.write(JSON.stringify(dataList.getData7));
	}else{
		res.write(JSON.stringify(dataList.getData));
	}
	res.end();
})

module.exports = router;
