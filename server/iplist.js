
function StaticIpList(array) {
	this.array = array;
}

StaticIpList.prototype.refresh = function() {
	return;
}

StaticIpList.prototype.foreach = function(cb) {
	for(var li in this.array) {
		var elem = li.split(":");
		cb(elem[0], elem[1]);
	}
}

module.exports = {
	fromList: function(a) {
		return new StaticIpList(a);
	}

};

