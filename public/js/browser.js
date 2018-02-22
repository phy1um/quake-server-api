
var QBROWSER = QBROWSER || {};

QBROWSER.makeServerBrowser = function(parentId, uri) {
	var e = document.getElementById(parentId);
	if(e === undefined || e === null) {
		console.error("Cannot create server browser table in #" 
			+ parentId + ", element does not exist!");
		return;
	}

	var table = document.createElement("table");
	table.headerData = ["Country", "Name", "Game", "Mode", "Players"];	
	addRow(table, "th", table.headerData);
	e.appendChild(table);
	this.updateBrowser(table, uri);
	return table;
}


function addRow(elem, type, content) {
	// validate elem
	if(typeof elem === "string") {
		var selector = elem;
		elem = document.getElementById(selector);
		if(elem === undefined) {
			console.error("Could not get element: #" + selector);
			return;
		}
	}
	else {
		if(!elem || !elem.appendChild) {
			console.error("Invalid element passed");
			return;
		}
	}
	// make a new row with content
	var row = document.createElement("tr");
	for(var i = 0; i < content.length; i++) {
		var body = content[i];
		var e = document.createElement(type);
		e.innerText = body;
		row.appendChild(e);
	}
	elem.appendChild(row);
}

QBROWSER.updateBrowser = function(table, target) {
	// TODO: validate table
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(r) {
		if(req.readyState == 4) {
			if(req.status == 200) {
				doUpdate(table, JSON.parse(req.responseText));
			}
			else {
				console.error("Request to " + target
					+ " returned code: " + req.status);
				console.error(" > " + req.statusText);
				return;
			}
		}
	}
	req.open("GET", target);
	req.send(null);
}

function doUpdate(table, servers) {
	if(servers.error) {
		console.error(servers.error);
		return;
	}
	table.innerHTML = "";
	addRow(table, "th", table.headerData);
	var list = servers.servers;
	for(var i = 0; i < list.length; i++) {
		var sv = list[i];
		addRow(table, "td", [sv.location.countryCode, 
			sv.info.serverName,sv.info.gameDir, 
			sv.info.gameTypeShort,
			sv.info.players + "/" + sv.info.maxPlayers]);
	}
}

function doError() {
	console.error("BAD request");
	return;
}
