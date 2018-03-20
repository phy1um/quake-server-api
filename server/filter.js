function testInfo(field, test) {
	return function(e) {
		if(e === undefined) return false;
		if(e.info === undefined) return false;
		if(e.info[field] === undefined) return false;
		return (e.info[field] === test);
	};
}

const filter = {
	// test field in info
	testInfo: testInfo,
	// special extension, not part of e.info!
	withCountry: function(c) {
		return function(e) {
			return (e.location && e.location === c);
		}
	},
	// special cases of testInfo
	withName: function(name) {
		return testInfo("serverName", name);
	},
	withGame: function(game) {
		return testInfo("gameDir", game);
	},
	withMode: function(mode) {
		return testInfo("gameTypeShort", mode);
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
		let args = [...arguments];
		if(args.length === 0) {
			return function(e) {
				return true;
			}
		}
		else return function(e) {
			let res = true;
			for(let i = 0; i < args.length; i++) {
				let f = args[i];
				if(typeof f !== "function") {
					console.log("Taking logical and with non-function:");
					console.dir(args);
					throw new Error("Could not take logical and");
				}
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


function makeComboFilter(parts, f) {
	let li = [];
	for(let i = 0; i < parts.length; i++) {
		li.push(f(parts[i]));
	}
	return filter.and(...li);
}
function fromQuery(q) {
	let m = new Matcher();
	if(q !== undefined) {
		if(q.name) {
			const and = makeComboFilter(q.name.split("+"), 
						filter.withName);
			m.addFilter(and);
		}
		if(q.game) {
			const and = makeComboFilter(q.game.split("+"),
						filter.withGame);
			m.addFilter(and);
		}
		if(q.mode) {
			const and = makeComboFilter(q.mode.split("+"),
						filter.withMode);
			m.addFilter(and);
		}
		if(q.country) {
			const and = makeComboFilter(q.country.split("+"),
						filter.withCountry);
			m.addFilter(and);

		}
		if(q.full === "none") {
			m.addFilter(filter.noFull);
		}
		else if(q.full === "only") {
			m.addFilter(filter.not(filter.noFull));
		}
		if(q.empty === "none") {
			m.addFilter(filter.noEmpty);
		}
		else if(q.empty === "only") {
			m.addFilter(filter.not(filter.noEmpty));
		}
		
	}
	return m;
}


Matcher.prototype.process = function(serverData) {
	let servers = serverData.getWorkingArray();
	// build a filter which is the  logical AND of filters in this matcher
	let f = filter.and(...this.filters);
	let out = [];

	// build an output array from servers which match the filters
	for(let ks in servers) {
		if(f(servers[ks])) {
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
