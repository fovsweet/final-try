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
	res.render('electricity/index',
		{
			title:'乐美电商',
			layout:'../components/nav',
			baseurl:'./views/electricity/'
		}
	)
});

//nav getter
router.post('/menu',function(req,res,next){
	comMe.getNav(req,res);
})

module.exports = router;