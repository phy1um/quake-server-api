
function Matcher() {
	this.nameFilter = [];
	this.regionFilter = [];
	this.full = true;
	this.empty = true;
	this.modeFilter = [];
	this.gameFilter = [];
	this.errorFlag = false;
	this.errorMsg = "No error";
	this.error = (s) => {
		throw new Error(s);
	}
}

Matcher.prototype.addNameFilter = function(f) {
	verifyStringAndAppend(this, f, this.nameFilter);
}

Matcher.prototype.addRegionFilter = function(f) {
	verifyStringAndAppend(this, f.toUpperCase(), this.regionFilter);
}

Matcher.prototype.addModeFilter = function(f) {
	verifyStringAndAppend(this, f.toUpperCase(), this.modeFilter);
}

Matcher.prototype.addGameFilter = function(f) {
	verifyStringAndAppend(this, f.toUpperCase(), this.gameFilter);
}

function verifyStringAndAppend(m, s, arr) {
	if(typeof s !== "string") {
		m.error("Parameter was not a string");
	}
	else {
		arr.push(s);
	}
}

Matcher.prototype.setMatchFull = function(b) {
	if(b == "yes") {
		this.full = true;
	}
	else if (b == "no") {
		this.full = false;
	}
	else {
		this.error("Parameter to MatchFull was not valid. "+
			"Expected: 'yes'/'no', Got: " + b);
	}
}

Matcher.prototype.setMatchEmpty = function(b) {
	if(b == "yes") {
		this.empty = true;
	}
	else if (b == "no") {
		this.empty = false;
	}
	else {
		this.error("Parameter to MatchEmpty was not valid. "+
			"Expected: 'yes'/'no', Got: " + b);
	}
}

Matcher.prototype.matchOn = function(serverData) {
	var match = [];
	for(let server of serverData.serverIterate()) {
		serverFull=(server.info
			&&(server.info.players == server.info.maxPlayers));
	/*	console.log("MATCHING SERVER~~");
		console.dir(server);
		console.dir(this);*/
		if(
		 ((server.info.players == 0) == this.empty) 
		 && ( serverFull == this.full || this.full && !serverFull)
		 &&(server.info && this.nameFilter.length <= 0 ? true : 
		  doesContainPart(this.nameFilter, server.info.serverName))
		 &&(server.location && this.regionFilter.length <= 0 ? true :
		  doesContain(this.regionFilter, server.location.countryCode))
		 &&(server.info && this.modeFilter.length <= 0 ? true :
		  doesContain(this.modeFilter, server.info.gameTypeShort))
		 &&(server.info && this.gameFilter.length <= 0 ? true :
		  doesContain(this.gameFilter, server.info.gameDir))) 
		{
			match.push(server);
		}
	}
	let d = new Date();
	return {
		"retrievalDate": d,
		"timestamp": parseInt(d / 1000),
		"serverCount": match.length,
		"servers":match
	};
}


// represent the mapping of parameters to function calls in data
const matcherStringComponents = { 
	"name": Matcher.prototype.addNameFilter,
	"region": Matcher.prototype.addRegionFilter,
	"mode": Matcher.prototype.addModeFilter,
	"game": Matcher.prototype.addGameFilter
};
module.exports = {
	fromParams: function(params) {
		console.log("PARAMS =>>>");
		console.dir(params);
		let m = new Matcher();
		for(let key in params) {
			if(key === "empty") {
				m.setMatchEmpty(params.empty);
			}
			else if(key === "full") {
				m.setMatchFull(params.full);
			}
			else if(matcherStringComponents[key]) {
				if(typeof params[key] === "string") {
					let s = params[key].split(",");
					if(s.length <= 1) {
						matcherStringComponents[key]
							.call(m, params[key]);
						continue;
					}
					else {
						console.log("SPLIT: ");
						console.dir(s);
						params[key] = s;
					}
				}
				for(let n in params[key]) {
					matcherStringComponents[key].call(
						m, params[key][n]);
				}
			}
		}

		return m;
	}
};

// ~~~~~~~~~~~~~~~~~~~
// internal functions
//
function doesContain(filter, target) {
	for(let i = 0; i < filter.length; i++) {
		if(filter[i] === target) {
			return true;
		}
	}
	return false;
}

function doesContainPart(filter, target) {
	for(let i = 0; i < filter.length; i++) {
		if(target.includes(filter[i])) {
			return true;
		}
	}
	return false;
}
