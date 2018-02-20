
function isIp(addr) {
	return true;
}

function StaticIpList(array) {
	this.array = [];
	// verify elements of array are "ip:port" pairs!
	for(let k in array) {
		let e = array[k];
		if(typeof e !== "string") {
			if(e.ip !== undefined && e.port !== undefined) {
				this.array.push(e);
			}
			else {
				throw new Error("Invalid object in "
					+ "StaticIpList Array: no ip/port keys");
			}
		}
		else {
			let parts = e.split(":");
			if(parts.length == 2) {
				let o = {"ip": parts[0], "port": parts[1]};
				this.array.push(o);
			}
			else {
				throw new Error("Bad string in "
					+ "StaticIpList: " + e);
			}
		}
	}
}

StaticIpList.prototype.refresh = function() {
	return;
}

StaticIpList.prototype.foreach = function(cb) {
	for(let k in this.array) {
		let e = this.array[k];
		cb(e.ip, e.port);
	}
}

module.exports = {
	fromList: function(a) {
		return new StaticIpList(a);
	}

};

