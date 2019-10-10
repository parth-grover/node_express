const jwt = require('jsonwebtoken'); 

module.exports = (req,res,next) =>{
	if(req.headers.authorization){
		if (typeof req.headers.authorization.split(" ")[1] !== 'undefined' && req.headers.authorization.split(" ")[0] === 'Token'){
			try{
				const token = req.headers.authorization.split(" ")[1];
				jwt.verify(token,'test_api');
				next();
			}catch(error){
				return res.status(400).json({
					status: 'failed',
					message: 'Not a valid sender'
				});
			}
		}else{
			return res.status(400).json({
				status: 'failed',
				message: 'Invalid token.'
			});
		}
	}else{
		return res.status(401).json({
			status: 'failed',
			message: 'Access denied. No token provided.'
		});
	}
};