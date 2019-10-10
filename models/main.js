var mysqldb = require('../mysqldb');
var logger = require('../logger');

const main = {
}

main.get = function(uri,callback){
	var a = mysqldb.query("SELECT *  FROM `aborder`.`ab_sk` WHERE product_uri = ?",uri, function(err, result) {
			if (err) {
				logger.error(err);
				return callback(err,null);
			}
			if (result.length){
				return callback(null,result[0]);
			}else{
				return callback(null,null);
			}	
	});
}

module.exports = main;