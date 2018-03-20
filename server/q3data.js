
const dgram = require('dgram');
const path = require('path');
const locate = require(path.resolve(__dirname, "./locate.js"));
const q3json = require(path.resolve(__dirname, "./q3json.js"));

const STAT_READY = 0;
const STAT_UPDATING = 1;
const STAT_ERR = -1;
const STAT_BUSY = 2;

var OOB = Buffer.alloc(4, 0xff);
var getStatusMsg = Buffer.from("getstatus");
getStatusMsg = Buffer.concat([OOB, getStatusMsg], OOB.length + 
	getStatusMsg.length);
var getInfoMsg = Buffer.from("getinfo");
getInfoMsg = Buffer.concat([OOB, getInfoMsg], OOB.length + getInfoMsg.length);

/**
 * Class: ServerData
 * Represents data polled from servers
 * Recieves server addresses (ip:port) from a ServerList by iterating
 * Sends UDP messages to servers, and processes responses
 * NOTE: Currently there is no concept of a "timeout"
 *  We do not track if a server polled never responds and should be
 *  treated as unavailible.
 */


/**
 * Poll the server ip list, and send requests to each server to get their info
 * These messages are handled by prototype.processMessage(msg, rinfo)
 */
ServerData.prototype.update = function() {
	if(!this.stat == STAT_READY) {
		console.error("Called update on busy server data object");
		return;
	}
	this.stat = STAT_UPDATING;
	// iterate over list container object
	this.ipList.foreach( (ip, port) => {
		// send "getstatus" request to a q3 server
		this.socket.send(getStatusMsg,0,getStatusMsg.length,port,ip,
			(err) => {
				if(err) console.error("Could not connect to " +
					ip + ":" + port);
			}
		);
	}
	);
	this.lastUpdate = Math.floor(new Date() / 1000);
	this.stat = STAT_READY;
};


function clone(data) {
	return JSON.parse(JSON.stringify(data));
};
/**
 * Get a "working copy" array of all servers currently in this ServerData
 */
ServerData.prototype.getWorkingArray = function() {
	var out = [];
	for(let key in this.data) {
		let d = this.data[key];
		out.push(clone(d));	
	}
	return out;
};


/**
 * Get a document for a given key - either existing document or {}
 */
ServerData.prototype.getDocument = function(key) {
	if (! (key in this.data) ) {
		var o = {}
		this.data[key] = o;
		return o;
	}
	else return this.data[key];
}

ServerData.prototype.getServers = function() {
	return this.data;
}


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
	this.socket.on('message', (msg, rinfo) => {
		processMessage.call(this, msg, rinfo);
	});
	this.socket.parSvData= this; 
	this.stat = STAT_READY;
	//console.dir(this.socket);

}

// Exports..
var data = {
	// Export a simple constructor
	from: function(ipList) {
		return new ServerData(ipList);	
	},

	
};


module.exports = data;


/**
 * Handle incoming responses from servers, parse the lines of data and pass off
 *  handling to other functions.
 * TODO: Simple verification that input is from a Q3 server
 */
function processMessage(msg, rinfo) {
	var lines = msg.toString().split("\n");
	var serverRules = q3json.parseStatusBody(lines[1]);
	var playerList = [];
	// lines 2 -> end are player info
	for(let i = 2; i < lines.length; i++) {
		if(lines[i].length > 1) {
			var playerInfo = lines[i].split(" ");
			playerList.push({name:playerInfo[2], 
				score:parseInt(playerInfo[0])});
		}
	}
	// update our in memory "database"
	updateData.call(this, rinfo.address, rinfo.port, serverRules, playerList);
};


/**
 * Update our in-memeory storage of server info
 * TODO: Consider making this nicer than just some array structure -
 *  is Redis overkill?
 */
function updateData (ip, port, rules, players) {
	var key = ip + ":" + port;
	var doc = this.getDocument(key);
	//updateServerDataInfo(doc, rules);
	doc.players = players;
	doc.rules = rules;
	doc.address = ip;
	doc.port = port;
	doc.filteredPlayers = {};
	q3json.updateServerInfo(doc);
	if(doc.location === undefined) {
		locate.findServer(doc, (err, loc) => {
			if(err) {
				console.error(err);
				doc.location = locate.null;
			}
			else {
				doc.location = loc;
			}
		});
	}
	if(doc.info.gameDir.toUpperCase() === "BASEQ3") {
		doc.game = "Quake 3";
	}
	else if(doc.info.gameDir.toUpperCase() === "CPMA") {
		doc.game = "CPMA";
	}
	else {
		game = doc.info.gameDir;
	}

}
