
const assert = require('assert');
const match = require('../server/filter');

let egServer1= {
	"info": {
		"serverName": "example1",
		"gameDir": "game1",
		"gameTypeShort": "mode1",
		"players": 16,
		"maxPlayers": 16
	},
	"location": "au"
};

let egServer2= {
	"info": {
		"serverName": "example2",
		"gameDir": "game1",
		"gameTypeShort": "mode2",
		"players": 0,
		"maxPlayers": 16

	},
	"location": "au"
};

let egServer3= {
	"info": {
		"serverName": "example3",
		"gameDir": "game1",
		"gameTypeShort": "mode3",
		"players": 16,
		"maxPlayers": 16

	},
	"location": "ca"
};

let egServer4= {
	"info": {
		"serverName": "example4",
		"gameDir": "game2",
		"gameTypeShort": "mode3",
		"players": 1,
		"maxPlayers": 16

	},
	"location": "au"
};

let egServer5= {
	"info": {
		"serverName": "example5",
		"gameDir": "game2",
		"gameTypeShort": "mode5",
		"players": 0,
		"maxPlayers": 16

	},
};

let egServer6= {
	"info": {
		"serverName": "example6",
		"gameDir": "game2",
		"gameTypeShort": "mode6",
		"players": 16,
		"maxPlayers": 16

	},
	"location": "ca"
};

let egList = [egServer1, egServer2, egServer3, egServer4, egServer5, egServer6];


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
		it("Should return server with name 'example5'", function() {
			m = new match.Matcher();
			m.addFilter(match.filters.withName("example5"));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer5]);
		});
	});
	describe("* Filter Mode", function() {
		it("Should return servers 3, 4 with gameTypeShort='mode3'", function() {
			m = new match.Matcher();
			m.addFilter(match.filters.withMode("mode3"));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer3, egServer4]);
		});
	});
	describe("* Filter Game", function() {
		it("Should list servers 4,5,6 with gameDir='game2'", function() {
			let m = new match.Matcher();
			m.addFilter(match.filters.withGame("game2"));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer4, egServer5, egServer6]);
		}); 
	});
	describe("* Filter Full", function() {
		it("Should filter servers out which have max players", function() {
			// 1,3,6
			let m = new match.Matcher();
			m.addFilter(match.filters.noFull);
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer2, egServer4, egServer5]);
		});
	});
	describe("* Filter Empty", function() {
		it("Should filter servers out with 0 players", function() {
			// 2,5
			let m = new match.Matcher();
			m.addFilter(match.filters.noEmpty);
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer1, egServer3, egServer4, egServer6]);
		});
	});
	describe("* Filter Negated", function() {
		it("Should filter servers which are NOT named example6", function() {
			let m = new match.Matcher();
			m.addFilter(match.filters.not(match.filters.withName("example6")));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer1, egServer2, egServer3, egServer4, egServer5]);

		});
	});
	describe("* Filter Logical AND", function() {
		it("Should filter servers with mode mode2 AND game game2", function() {
			let m = new match.Matcher();
			m.addFilter(match.filters.and(
				match.filters.withMode("mode2"),
				match.filters.withGame("game1")
			));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, [egServer2]);
		});
	});
	describe("* Filter Logical OR", function() {
		it("Should list servers with game2 or game1 - all servers", function() {
			let m = new match.Matcher();
			m.addFilter(match.filters.or(
				match.filters.withGame("game1"),
				match.filters.withGame("game2")
			));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, egList);

		})
	});
	describe("* Filter Name Containing..", function() {
		it("Should list all server names containing 'example' - all of them", function() {
			let m = new match.Matcher();
			m.addFilter(match.filters.nameContains("example"));
			let out = m.process(fakeServerData);
			assert.deepEqual(out, egList);
		});
	});
});
