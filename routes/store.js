var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
	res.render('st/index',
		{
			title:'乐美门店',
			layout:'./common/components/nav',
			baseurl:'./views/st/'
		}
	)
});

module.exports = router;