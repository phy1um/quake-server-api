const path = require('path');
const geoip = require(path.join(__dirname, "./geoip.js"));
const country = require(path.join(__dirname, "./country.js"));

module.exports = {
	parseStatusBody: function(line) {
		var out = {};
		var rules = line.split('\\');
		for(var i = 1; i < rules.length; i+=2) {
			if(i+1 < rules.length) {
				out[rules[i]] = rules[i+1];
			}
			else {
				rules[i] = "RANGE ERROR";
			}
		}
		return out;
	},
	updateServerInfo: function(serverDoc) {
		serverDoc.info = {};
		serverDoc.info.protocol = serverDoc.rules.protocol;
		serverDoc.info.serverName = serverDoc.rules.sv_hostname;
		serverDoc.info.map = serverDoc.rules.mapname;
		serverDoc.info.gameDir = serverDoc.rules.gamename.toUpperCase(); 
		serverDoc.info.game = serverDoc.rules.mode_current; 
		serverDoc.info.gameTypeShort = "1v1";
		serverDoc.info.gameTypeFull = serverDoc.rules.mode_current;
		serverDoc.info.players = serverDoc.players.length;
		serverDoc.info.maxPlayers = serverDoc.rules.sv_maxclients;
		serverDoc.info.bots = 0;
		vs = serverDoc.rules.version.split(" ");
		serverDoc.info.serverType = vs[0];
		serverDoc.info.serverOS = vs[2];
		serverDoc.info["private"] = (serverDoc.rules.g_needpass == "1")
		serverDoc.info.serverVersion= vs[1];

		serverDoc.location = {};
		serverDoc.location.countryName = "unknown";
		serverDoc.location.state = "N/A";
		withLocationProperty(serverDoc.rules, (err, value) => {
			if(err) { 
				console.error(err);
				return;
			}
			let parts = value.split(",");
			for(let i = 0; i < parts.length; i++) {
				let test = parts[i].trim();
				if(country.isCountry(test)) {
					serverDoc.location.countryName = test;
					break;
				}
				else if(country.isUSState(test)) {
					serverDoc.location.countryName = "United States";
					serverDoc.location.state = test;
					break;
				}
			}
		});
		serverDoc.location.countryCode = 
			country.codeFromName(serverDoc.location.countryName);
	}
};


function withLocationProperty(o, cb) {
	for(let key in o) {
		let i = key.toUpperCase().indexOf("LOCATION");
		if(i >= 0) {
			cb(undefined, o[key]);
		}
	}
}
