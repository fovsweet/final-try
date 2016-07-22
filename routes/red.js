//nav getter
var $red = require('../staticdb/red');
var saveTrue = {"msg":"保存成功","success":true};

module.exports = {
	getRul:function(req,res){		//获取公共Nav
		var depData = $red.ruleList;
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(depData));
	    res.end();
	},
	getDep:function(req,res){		//获取公共Nav
		var depData = $red.deposit;
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(depData));
	    res.end();
	},
	saveDep:function(req,res){		//获取公共Nav
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(saveTrue));
	    res.end();
	},
	saveRule:function(req,res){		//获取公共Nav
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(saveTrue));
	    res.end();
	},
	store:function(req,res){		//获取公共Nav
		var zNode = $red.zNode;
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(zNode));
	    res.end();
	},
	ruleDetail:function(req,res){		//获取公共Nav
		var ruleDetail = $red.ruleDetail;
		res.writeHead(200,{"content-type":"application/json"});
	    res.write(JSON.stringify(ruleDetail));
	    res.end();
	}
};