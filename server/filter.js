const filter = {
	// test field in info
	testInfo: function(field, test) {
		return function(e) {
			if(e === undefined) return false;
			if(e.info === undefined) return false;
			if(e.info[field] === undefined) return false;
			return (e.info[field] === test);
		}
	},
	// special extension, not part of e.info!
	withCountry: function(c) {
		return function(e) {
			return (e.location && e.location === e);
		}
	},
	// special cases of testInfo
	withName: function(name) {
		return this.testInfo("serverName", name);
	},
	withGame: function(game) {
		return this.testInfo("gameDir", game);
	},
	withMode: function(mode) {
		return this.testInfo("gameTypeShort", mode);
	},

	// check if serverName _contains_ a value
	nameContains: function(str) {
		return function(e) {
			if(e === undefined) return false;
			if(e.info === undefined) return false
			if(e.info.serverName === undefined) return false;
				return (e.info.serverName.indexOf(str) !== -1);
		}
	},

	// boolean spaghetti
	noFull: function(e) {
		return(e.info && e.info.players !== undefined && e.info.maxPlayers 
			&& (e.info.players < e.info.maxPlayers));
	},
	noEmpty: function(e) {
		return(e.info && e.info.players !== undefined
			&& e.info.players != 0);
	},
		// utility/composition functions
	not: function(filter) {
		return function(e) {
			return !(filter(e));
		}
	},
	or: function() {
		let args = arguments;
		return function(e) {
			let res = false;
			for(let i = 0; i < args.length; i++) {
				let f = args[i];
				res = f(e);
				if(res === true) {
					return true;
				}
			}
			return false;
		}
	},
	and: function() {
		let args = arguments;
		return function(e) {
			let res = true;
			for(let i = 0; i < args.length; i++) {
				let f = args[i];
				res = f(e);
				if(res === false) {
					return false;
				}
			}
			return true;
		}
	}
}

function Matcher() {
	this.filters = [];
}

Matcher.prototype.addFilter = function(f) {
	this.filters.push(f);
};

function fromQuery(q) {
	let m = new Matcher();
	if(q !== undefined) {
		if(q.name) {
			m.addFilter(filter.withName(q.name));
		}
		if(q.game) {
			m.addFilter(filter.withGame(q.game));
		}
		if(q.mode) {
			m.addFilter(filter.withMode(q.mode));
		}
		if(q.full === "no") {
			m.addFilter(filter.noFull);
		}
		if(q.empty === "no") {
			m.addFilter(filter.noEmpty);
		}
		if(q.country) {
			m.addFilter(filter.withCountry(q.country));
		}
	}
	return m;
}


Matcher.prototype.process = function(serverData) {
	let servers = serverData.getWorkingArray();
	let flags = Array(servers.length).fill(true);

	// for each filter, ignore FALSE flags and update TRUE flags
	for(let kf in this.filters) {
		let filter = this.filters[kf];
		for(let ks in servers) {
			if(flags[ks]) {
				flags[ks] = filter(servers[ks]);
			}
		}
	}

	// build an array for output from servers with their flag still set
	let out = [];
	for(let ks in servers) {
		if(flags[ks]) {
			out.push(servers[ks]);		
		}
	}

	return out;
}

module.exports = {
	Matcher: Matcher,
	fromQuery: fromQuery,
	filters: filter
};
