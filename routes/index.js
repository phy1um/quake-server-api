
const router = require('express').Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get("/browser", function(req, res, next) {
	let match = matcher.fromQuery(req.query);
	let out = match.process();
	res.render('browser', {"servers": out});
});


module.exports = router;

