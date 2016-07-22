var express = require('express');
var router = express.Router();

/*公共方法集中引入文件*/
/*
*引入公共导航栏方法——getNav()
*
*/
var comMe = require('./common');

/* GET home page. */
router.get('/',function(req,res,next){
	res.render('op/index',
		{
			title:'乐美运营',
			layout:'../components/nav',
			baseurl:'./views/op/'
		}
	)
});

//nav getter
router.post('/menu',function(req,res,next){
	comMe.getNav(req,res);
})

/*红包规则配置*/
var redPre = require('./red');

router.post('/show/ruleList',function(req,res,next){
	redPre.getRul(req,res)
})

router.post('/show/deposit',function(req,res,next){
	redPre.getDep(req,res)
})

router.post('/show/saveDeposit',function(req,res,next){
	redPre.saveDep(req,res)
})

router.post('/show/saveRule',function(req,res,next){
	console.log(req.body);
	redPre.saveRule(req,res)
})

router.post('/show/store',function(req,res,next){
	redPre.store(req,res)
})

router.post('/show/ruleDetail',function(req,res,next){
	redPre.ruleDetail(req,res)
})

router.post('/show/test',function(req,res,next){
	console.log(req)
	res.writeHead(200,{"content-type":"application/json"});
    res.write(JSON.stringify({"msg":"保存成功","success":true}));
    res.end();
})

module.exports = router;