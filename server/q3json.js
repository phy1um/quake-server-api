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
	},
	updateServerInfo: function(serverDoc) {
		serverDoc.info = {};
		serverDoc.info.protocol = -1;
		serverDoc.info.serverName = serverDoc.rules.sv_hostname;
		serverDoc.info.map = serverDoc.rules.mapname;
		serverDoc.info.gameDir = XXX
		serverDoc.info.game = XXX
		serverDoc.info.gameTypeShort = XXX
		serverDoc.info.gameTypeFull = XXX
		serverDoc.info.players = serverDoc.players.length();
		serverDoc.info.maxPlayers = serverDoc.rules.sv_maxClients;
		serverDoc.info.bots = 0;
		serverDoc.info.serverType = XXX
		serverDoc.info.serverOS = XXX
		serverDoc.info["private"] = XXX
		serverDoc.info.serverVersion= XXX
	}
};
