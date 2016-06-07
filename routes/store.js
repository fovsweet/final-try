var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
	res.render('index',{title:'乐美门店' , layout:'../common/nav'})
});

module.exports = router;