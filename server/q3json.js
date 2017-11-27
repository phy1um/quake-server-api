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
		serverDoc.info.gameDir = serverDoc.rules.gamename; 
		serverDoc.info.game = serverDoc.rules.mode_current; 
		serverDoc.info.gameTypeShort = serverDoc.rules.mode_current;
		serverDoc.info.gameTypeFull = serverDoc.rules.mode_current;
		serverDoc.info.players = serverDoc.players.length;
		serverDoc.info.maxPlayers = serverDoc.rules.sv_maxclients;
		serverDoc.info.bots = 0;
		vs = serverDoc.rules.version.split(" ");
		serverDoc.info.serverType = vs[0];
		serverDoc.info.serverOS = vs[2];
		serverDoc.info["private"] = (serverDoc.rules.g_needpass == "1")
		serverDoc.info.serverVersion= vs[1];
	}
};
