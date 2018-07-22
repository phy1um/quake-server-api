const path = require('path');
const matcher = require(path.join(__dirname, '../server/filter.js'));
module.exports = { withServerData: function(serverData) {

    const query_check = (process.env.QUERY_REQUIRE === "true");
	const router = require('express').Router();
	router.get("/list", function(req, res, next) {
		try {
            let match = matcher.fromQuery(req.query);
            if (match.filters.length <= 0 && query_check) {
                //console.log("No query in /list request");
                return res.json({
                    "error": "You must supply a valid query to filter results"
                });
            }
			console.dir(req.query);
			let servers = match.process(serverData)
			let date = new Date();
			let out = {
				retvievalDate: date,
				timestamp: Math.floor(date/1000),
				serverCount: servers.length,
				failedCount: 0,
				"servers": servers
			};

			res.json(out);
		} catch(e) {
			next(e);
		}
	});

	router.use(function(err, req, res, next) {
		if(err) {
			if(req.app.get('env') === 'development') {
				console.error(err);
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
