
function Matcher() {
	this.nameFilter = [];
	this.regionFilter = [];
	this.full = true;
	this.empty = true;
	this.modeFilter = [];
	this.gameFilter = [];
	this.errorFlag = false;
	this.errorMsg = "No error";
}

Matcher.prototype.addNameFilter = function(f) {
	// verify is string
	this.nameFilter.append(f);
}

Matcher.prototype.addRegionFilter = function(f) {
	// verify f is string AND f a valid code
	this.regionFilter.append(f);
}

Matcher.prototype.setModeFilter = function(f) {
	// verify is string
	if( typeof f != "string" ) {
		this.error("Paramter to setModeFilter was not a string");
	}
	else {
		this.modeFilter.append(f);
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

Matcher.prototype.matchOn = function(serverList) {
	var match = [];
	console.dir(serverList);
	for(let key in serverList) {
		let server = serverList[key];
		console.log("MATCHING SERVER~~");
		console.dir(server);
		console.dir(this);
		if(
		 true
		 //((server.rules.players == 0) == this.empty) 
		 //&&((server.rules.players==server.rules.maxPlayers)
		 //  && this.full)
		 &&(this.nameFilter.length <= 0 ? true : 
		  doesContainPart(this.nameFilter, server.info.serverName))
		 &&(this.regionFilter.length <= 0 ? true :
		  doesContain(this.regionFilter, server.location.countryCode))
		 &&(this.modeFilter.length <= 0 ? true :
		  doesContain(this.modeFilter, server.info.gameTypeShort))
		 &&(this.gameFilter.length <= 0 ? true :
		  doesContain(this.gameFilter, server.info.gameDir))) 
		{
			match.push(server);
		}
	}
	return {
		"retrievalDate": "foo",
		"timestamp": 1234,
		"serverCount": match.length,
		"servers":match
	};
}


module.exports = {
	fromParams: function(params) {
		return new Matcher();
	}
};

// ~~~~~~~~~~~~~~~~~~~
// internal functions
//
function doesContain(filter, target) {
	for(var f in filter) {
		if(f === target) {
			return true;
		}
	}
	return false;
}

function doesContainPart(filter, target) {
	for(var f in filter) {
		if(target.includes(f)) {
			return true;
		}
	}
	return false;
}
