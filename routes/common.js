//nav getter
var $nav = require('../staticdb/nav')
var navData = $nav.nav;

module.exports = {
	getNav:function(req,res){		//获取公共Nav
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(navData));
	    res.end();
	}
};