
const path = require('path');
const matcher = require(path.join(__dirname, '../server/filter.js'));

module.exports = {
    withServerData: function (serverData) {
        const router = require('express').Router();
        router.get('/', function (req, res) {
            console.log("LOGGING GET");
            try {
                res.render('index');
            }
            catch (e) {
                next(e);
            }
        });

        router.get("/browser", function (req, res, next) {
            try {
                let match = matcher.fromQuery(req.query);
                let out = match.process(serverData);
                res.render('browser', { "servers": out, "test": "foo" });
            }
            catch (e) {
                console.error(e);
                next(e);
            }
        });
        return router;
    }
};