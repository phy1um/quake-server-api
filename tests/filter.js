
const assert = require('assert');
const match = require('../server/filter');

let egSever1 = {
	"info": {
		"serverName": "example1",
		"gameDir": "game1",
		"gameTypeShort": "mode1",
	},
	"location": "au"
};

let egSever2 = {
	"info": {
		"serverName": "example2",
		"gameDir": "game1",
		"gameTypeShort": "mode2",
	},
	"location": "au"
};

let egSever3 = {
	"info": {
		"serverName": "example3",
		"gameDir": "game1",
		"gameTypeShort": "mode3",
	},
	"location": "ca"
};

let egSever4 = {
	"info": {
		"serverName": "example4",
		"gameDir": "game2",
		"gameTypeShort": "mode3",
	},
	"location": "au"
};

let egSever5 = {
	"info": {
		"serverName": "example5",
		"gameDir": "game2",
		"gameTypeShort": "mode5",
	},
};

let egSever6 = {
	"info": {
		"serverName": "example6",
		"gameDir": "game2",
		"gameTypeShort": "mode6",
	},
	"location": "ca"
};

let egList = [egSever1, egSever2, egSever3, egSever4, egSever5, egSever6];


let fakeServerData = {
	getWorkingArray: function() {return egList;}
};

describe("filter", function() {

	describe("* No Filter", function() {
		it("Should return all 6 example servers", function() {
			m = new match.Matcher();
			let out = m.process(fakeServerData);
			assert.deepEqual(out, egList);
		});
	});

	describe("* Filter Name", function() {
		it("Should return server with name 'example5'");
	});
	describe("* Filter Mode", function() {
		it("Should return servers 3, 4 with gameTypeShort='mode3'");
	});
	describe("* Filter Game", function() {
		it("Should list servers 4,5,6 with gameDir='game2'"); 
	});
	describe("* Filter Full", function() {
		it("Should filter servers out which have max players");
	});
	describe("* Filter Empty", function() {
		it("Should filter servers out with 0 players");
	});
	describe("* Filter Negated", function() {
		it("Should filter servers which are NOT named example6");
	});
	describe("* Filter Logical AND", function() {
		it("Should filter servers with name example2 AND game game2");
	});
	describe("* Filter Logical OR", function() {
		it("Should list servers with game2 or game1 - all servers")
	});
	describe("* Filter Name Containing..", function() {
		it("Should list all server names containing 'example' - all of them");
	});
});
