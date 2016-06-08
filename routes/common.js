var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/common',function(req,res,next){
	res.render('common/index',{title:'乐美电商'})
});

module.exports = router;