var express = require('express');
var router = express.Router();

var indexDao = require('../dao/indexDao');
var $nav = require('../staticdb/nav')
var navData = $nav.nav;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '乐美首页' , layout:'./components/nav' });
});

//nav getter
router.post('/menu',function(req,res,next){
	res.writeHead(200,{"content-type":"application/json"});
    res.write(JSON.stringify(navData));
    res.end();
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
