
const dgram = require('dgram');

// byte-level UDP packet data fiddling for talking to servers
// OOB is just a special 4 byte header
const OOB = Buffer.alloc(4, 0xff);
function getMessage(msg, proto) {
    // we only ever request everything (empty AND full), filter later
	const str = `${msg} ${proto} empty full`;
	return Buffer.concat([OOB,Buffer.from(str)], OOB.length
		+ str.length);
}


const serversMsg = getMessage("getservers", "68");

/**
 * Quake 3 Master Server connection. Each time we call refresh this will
 *  talk to a given master server and make a list of server IPs
 */
function Q3Master(ip, port) {
	this.ip = ip;
	this.port = port;
	this.sock = dgram.createSocket('udp4');
	this.sock.on('error', (err) => {
		console.error("Q3Master Socket Error: ");
		console.error(err);
	});
    // default message handler just puts them in the bin (we don't want them yet)
	this.sock.on('message', (msg, rinfo) => {
		binMessage(msg, rinfo);
	});
	this.serverList = [];
	this.lastUpdate = 0;
	this.refresh();
}

// Make request for servers
Q3Master.prototype.refresh = function() {
	let newList = [];
    // direct message handler to newList
	this.sock.on('message', (msg, rinfo) => {
		process(msg, rinfo, newList);
		console.log(`Newlist Size: ${newList.length}`);
	});
//	console.log(serversMsg.toString());
	this.sock.send(serversMsg,0,serversMsg.length,this.port,this.ip,
		(err) => {
			if(err) {
				console.error("Failed to talk to Q3Master @ "
					+ this.ip + ":" + this.port);
				console.error(err);
			}
			else {
				console.log(`Error but no error @ ${this.ip}:${this.port}`);
			}
		}
	);
	this.lastUpdate = Math.floor(new Date() / 1000);
    // this assignment leaves the old serverList alive in case any requests
    //  etc are holding on to references
	this.serverList = newList;

};

Q3Master.prototype.getServerArray = function() {
	return this.serverList;
}

Q3Master.prototype.foreach = function(cb) {
	const arr = this.getServerArray();
	for(let k in arr) {
		const server = arr[k];
		cb(server.ip, server.port);
	}
};

function binMessage(m) {
	//if(m) console.log("BINNING " + m);
}

function process(msg, rinfo, list) {
	const b = Buffer.from(msg);
    // extract command from bytes as a string
	const cmd = b.toString("utf8", 4, 22);
    // we only care about getserversResponse
	if(cmd !== "getserversResponse") {
		throw new Error(`Invalid response command from Q3 master: ${cmd}`);
	}
    // server info comes from 6 bytes then a 1 byte delimiter
    const delimiter = 0x5c;
	for(let i = 0; i < b.length; i++) {
		if(b[i] === delimiter) {
            // if there are no more full servers after this delimiter
			if(i+5 >= b.length) {
				// validateEnd(b, i+1);
                // done
				return;
			}
            // otherwise parse the server following this delimiter
			const server = parseServer(b, i+1);
			list.push(server);
            // manually walk forward to next delimiter
			i += 6;
		}
	}
	return list;
}

// get ip:port from bytes
function parseServer(b, start) {
	const ipParts = [b[start], b[start+1], b[start+2], b[start+3]];
	const ip = ipParts.join(".");
	const port = (b[start+4] * (16*16)) + b[start+5];
	return {ip: ip, port:port};
}

module.exports = {
	fromMaster: function(ip, port) {
		return new Q3Master(ip, port);
	}
};
