
function StaticIpList(array) {
	// verify elements of array are "ip:port" pairs!
	this.array = array;
	console.log(array);
}

StaticIpList.prototype.refresh = function() {
	return;
}

StaticIpList.prototype.foreach = function(cb) {
	console.log(this.array);
	for(let i = 0; i < this.array.length; i++) {
		let elem = this.array[i].split(":");
		console.log(elem);
		cb(elem[0], parseInt(elem[1]));
	}
}

module.exports = {
	fromList: function(a) {
		return new StaticIpList(a);
	}

};

