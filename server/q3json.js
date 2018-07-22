
module.exports = {
    // parse key:value pairs from server status body
    // NOTE this is dumb parsing - we can't detect if the fields make sense
    // one missing key could throw everything "out of sync", we can't
    // detect that here, it isn't in our scope
	parseStatusBody: function(line) {
		var out = {};
        // elements are delimited by slashes
		var rules = line.split('\\');
        // skip over 2 at a time, because these are pairs
		for(var i = 1; i < rules.length; i+=2) {
			if(i+1 < rules.length) {
				out[rules[i]] = rules[i+1];
			}
			else {
                // handle the lone key with no pair at the end of a list
				rules[i] = "RANGE ERROR";
			}
		}
		return out;
	},
    // update special fields by parsing rules
	updateServerInfo: function(serverDoc) {
		serverDoc.info = {};
		serverDoc.info.protocol = serverDoc.rules.protocol;
		serverDoc.info.serverName = serverDoc.rules.sv_hostname;
		serverDoc.info.map = serverDoc.rules.mapname;
		serverDoc.info.gameDir = serverDoc.rules.gamename.toUpperCase();
		serverDoc.info.game = serverDoc.rules.mode_current;
		serverDoc.info.gameTypeFull = serverDoc.rules.mode_current;
		serverDoc.info.gameTypeShort = shortGameName(
						serverDoc.info.gameTypeFull);
		serverDoc.info.players = serverDoc.players.length;
		serverDoc.info.maxPlayers = serverDoc.rules.sv_maxclients;
		serverDoc.info.bots = 0;
		vs = serverDoc.rules.version.split(" ");
		serverDoc.info.serverType = vs[0];
		serverDoc.info.serverOS = vs[2];
		serverDoc.info["private"] = (serverDoc.rules.g_needpass == "1")
		serverDoc.info.serverVersion= vs[1];

	},
};





const shortNames = {
	"Deathmatch": "FFA",
	"Team Deathmatch": "TDM",
	"1V1": "1V1",
	"Duel": "1V1",
	"2V2": "2V2",
	"Capture The Flag": "CTF",
	"Capture Strike": "CTFS",
	"Not Team Fortress": "NTF",
};

function shortGameName(mode) {
	const name = shortNames[mode];
	if(name === undefined) return "???";
	else return name;
}
