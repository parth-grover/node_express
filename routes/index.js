var express = require('express');
var router = express.Router();
var main = require('../models/main');

/* GET home page. */
router.get('/:uri', function(req, res, next) {
	main.get(req.params.uri,(err,data) =>{
		if(err){
			return res.status(500).json({
				status: "failed",
				message: "Not able to process data",
				data: null
			})
		}
		
		if(data){
			return res.status(200).json({
				status: 'success',
				message: 'Data found',
				data: data
			})
		}else{
			return res.status(200).json({
				status: 'sucess',
				message: 'No data found',
				data: null
			})
		}
	})
});

module.exports = router;
