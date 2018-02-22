
const router = require('express').Router();

router.get('/', function(req, res) {
	console.log("LOGGING GET");
	try {
		res.render('index');
	}
	catch(e) {
		next(e);
	}
});

router.get("/browser", function(req, res, next) {
	try {
		let match = matcher.fromQuery(req.query);
		let out = match.process();
		res.render('browser', {"servers": out, "test": "foo"});
	}
	catch(e) {
		next(e);
	}
});


module.exports = router;

