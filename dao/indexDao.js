var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $sql = require('./userSqlMapping');

var connection = mysql.createConnection($conf.mysql);

module.exports = {
	userInfo:function(req,res){
	    connection.query($sql.queryAll,function(err,data){
	        res.writeHead(200,{"content-type":"application/json"});
	        res.write(JSON.stringify(data));
	        res.end();
	    });
	},
	queryById:function(req,res){
		connection.query($sql.select,[req.body.id],function(err,data){
			res.writeHead(200,{"content-type":"application/json"});
			res.write(JSON.stringify(data));
	        res.end();
	    });
	}
}