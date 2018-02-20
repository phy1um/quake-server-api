const path = require('path');
const matcher = require(path.join(__dirname, '../server/filter.js'));
module.exports = { withServerData: function(serverData) {

	const router = require('express').Router();
	router.get("/list", function(req, res, next) {
		try {
			let match = matcher.fromQuery(req.query);
			console.dir(req.query);
			let out = match.process(serverData)
			res.json({'servers': out});
		} catch(e) {
			next(e);
		}
	});

	router.use(function(err, req, res, next) {
		if(err) {
			if(req.app.get('env') === 'development') {
				res.json({"error": err.message});
			}
			else {
				res.json({"error": "Failed to process request"});
			}

		}
		else {
			res.json({"error": "An unknown error occured"});
		}
	});

	return router;
}};
