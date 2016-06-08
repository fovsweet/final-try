var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cp',function(req,res,next){
	res.render('cp/index',{title:'乐美客流'})
});

module.exports = router;