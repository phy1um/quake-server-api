
const dgram = require('dgram');

const OOB = Buffer.alloc(4, 0xff);
function getMessage(msg, proto) {
	let str = `${msg} ${proto} empty full`; 
	return Buffer.concat([OOB,Buffer.from(str)], OOB.length 
		+ str.length);
}

const serversMsg = getMessage("getservers", "68");

function Q3Master(ip, port) {
	this.ip = ip;
	this.port = port;
	this.sock = dgram.createSocket('udp4');
	this.sock.on('error', (err) => {
		console.error("Q3Master Socket Error: ");
		console.error(err);
	});
	this.sock.on('message', (msg, rinfo) => {
		binMessage(msg, rinfo);
	});
	this.serverList = [];
	this.lastUpdate = 0;
}

Q3Master.prototype.refresh = function() {
	let newList = [];
	this.sock.on('message', (msg, rinfo) => {
		const e = process(msg, rinfo);
		newList.push(e);
	});
	console.log(serversMsg.toString());
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
	this.serverList = newList;
};

Q3Master.prototype.getServerArray = function() {
	return JSON.parse(JSON.stringify(this.serverList));
}

Q3Master.prototype.foreach = function(cb) {
	const arr = this.getServerArray();
	for(let k in arr) {
		let server = arr[k];
		cb(server.ip, server.port);
	}
};

function binMessage(m) {
	if(m) console.log("BINNING " + m);
}

function process(msg, rinfo) {
	console.log(`${rinfo} -- ${msg}`);
	return {};
}

module.exports = {
	fromMaster: function(ip, port) {
		return new Q3Master(ip, port);
	}
}; 
