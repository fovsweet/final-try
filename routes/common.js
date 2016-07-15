//nav getter
var $nav = require('../staticdb/nav');

module.exports = {
	getNav:function(req,res){		//获取公共Nav
		var navData = $nav.navDate(req,res);
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(navData));
	    res.end();
	}
};