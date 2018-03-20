/*const http = require('http');
const { URL} = require('url');

const geoIpBase = "freegeoip.net/json";
module.exports = {
	withLocation: function(ip, cb) {
		if(ip === undefined) {
			cb(new Error("No ip provided to function"));
		}
		const path = "http://"+geoIpBase+"/"+ip;
		const options = new URL(path);
		const req = http.request(options, (res) => {
			console.log("Got response")
			console.dir(res);
			cb(undefined, res.json);
		});
		req.on('error', (err) => {
			console.error("Failed to get " + path);
			cb(err);
		});

	}
};*/
