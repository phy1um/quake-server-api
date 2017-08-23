
const dgram = require('dgram');
const path = require('path');
const q3json = require(path.resolve(__dirname, "./q3json.js"));

/**
 * Class: ServerData
 * Represents data polled from servers
 * Recieves server addresses (ip:port) from a ServerList by iterating
 * Sends UDP messages to servers, and processes responses
 * NOTE: Currently there is no concept of a "timeout"
 *  We do not track if a server polled never responds and should be
 *  treated as unavailible.
 */
function ServerData(ipList) {
	this.ipList = ipList;
	this.lastUpdate = -1;
	this.data = {};
	this.socket = dgram.createSocket('udp4');
	this.socket.on('error', 
		(err) => {
			console.error("Error in socket: ");
			console.error(this.socket);
		}
	);
	this.socket.on('message', this.processMessage);

}

/**
 * Poll the server ip list, and send requests to each server to get their info
 * These messages are handled by prototype.processMessage(msg, rinfo)
 */
ServerData.prototype.update = function() {
	// iterate over list container object
	this.ipList.foreach( 
		(ip, port) => {
		// send "getstatus" request to a q3 server
		this.socket.send(getStatusMsg, 0, getStatusMsg.length, port, ip, 
			(err) => {
				if(err) console.error("Could not connect to " + 
					ip + ":" + port);
			}
		);
		}
	);
	this.lastUpdate = Math.floor(new Date() / 1000);
};


/**
 * Handle incoming responses from servers, parse the lines of data and pass off
 *  handling to other functions.
 * TODO: Simple verification that input is from a Q3 server
 */
ServerData.prototype.processMessage = function(msg, rinfo) {
	console.log(msg);
	var lines = msg.toString().split("\n");
	var serverRules = q3json.parseStatusBody(lines[1]);
	var playerList = [];
	// lines 2 -> end are player info
	for(let i = 2; i < lines.length; i++) {
		var playerInfo = lines[i].split(" ");
		playerList.push({name:playerInfo[2], 
			score:parseInt(playerInfo[0])});
	}
	// update our in memory "database"
	this.updateData(rinfo.address, rinfo.port, serverRules, playerList);
};


/**
 * Update our in-memeory storage of server info
 * TODO: Consider making this nicer than just some array structure -
 *  is Redis overkill?
 */
ServerData.prototype.updateData = function(ip, port, rules, players) {
	var key = ip + ":" + port;
	var doc = this.fetch(key);
	updateServerDataInfo(doc, rules);
	doc.players = players;
	doc.rules = rules;
	doc.filteredPlayers = {};
	doc.location = {"countryCode":getCountryCode(rules[".Location"])};
}

// Exports..
var data = {
	// Export a simple constructor
	from: function(ipList) {
		return new ServerData(ipList);	
	},

	
};
