var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/el',function(req,res,next){
	res.render('el/index',{title:'乐美电商'})
});

module.exports = router;