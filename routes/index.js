var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req)
	res.render('index', { title: '乐美首页' , layout:'common/nav' });
});

module.exports = router;
