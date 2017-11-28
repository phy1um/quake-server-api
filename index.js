
const Express 		= require("express");
const path 		= require("path");
const IpList		= require(path.resolve(__dirname, "./server/iplist.js"));
const ServerData	= require(path.resolve(__dirname, "./server/q3data.js"));
const Matcher 		= require(path.resolve(__dirname, "./server/matcher.js"));

const app = Express();




console.log("Starting routes for Server service");

var routes = Express.Router();

// we are testing with a list of static ips
var list = ["192.168.1.15:27960", "oafps.com:27961"];
// our tables has to have a list to read from, which can be updated
var ips = IpList.fromList(list);
// create serverdata from our ip list (ping each ip, process results..)
var serverData = ServerData.from(ips);
serverData.update();

setInterval(() => {
		ips.refresh();
	}, 60000);

setInterval(() => {
		serverData.update();
	}, 5000);


routes.get("/", (req, res, next) => {

	console.log("MATCHING");
	var match = Matcher.fromParams(req.params);
	var output = match.matchOn(serverData);
	res.json(output);

});


app.use("/", routes);
app.listen(8800);
