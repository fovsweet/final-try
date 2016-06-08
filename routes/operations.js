var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/op',function(req,res,next){
	res.render('op/index',{title:'乐美运营'})
});

module.exports = router;