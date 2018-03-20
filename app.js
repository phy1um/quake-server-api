var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// USE THIS ->
//var rateLimit = require('express-rate-limit');

const index = require('./routes/index');
const iplist = require('./server/iplist');
const serverdata = require('./server/q3data');
const Matcher = require('./server/filter');
const q3master = require('./server/q3master');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);

console.log("Starting routes for Server service");

var routes = express.Router();

// we are testing with a list of static ips
const list = [
	// oafps
	"oafps.com:27961", "oafps.com:27962", "oafps.com:27963","oafps.com:27964",
	// worried about 2pac
	"180.181.128.198:27961",

	// Freddian's
	"cpm.freddian.tf:27960","cpm.freddian.tf:27961","jp.freddian.tf:27960",

	// Vixterra
	"q3.vixterra.com:27960","45.63.78.66:27970",
	//other NA
	"107.170.154.187:27960","138.197.162.183:27960",
	"138.197.162.183:27960", "quake.getserved.tv:27961",
	"138.68.21.116:27960", "63.142.255.102:27961",
	"63.142.255.102:27962", "137.74.172.191:27960",
	"137.74.172.191:27961", 
	// ireland
	"promode.rocks:27960",
	// swe
	"cpm.snapcase.net:27960", "snapcase.net:27960",
	// ne
	"82.196.10.31:27960", "backrail.city:27960",
	// de
	"45.77.65.202:27960",
	// england (ccam)
	"209.250.228.195:27960",
	// pl
	"q3.com.pl:27960", "q3.com.pl:27961",
	// ru
	"46.38.48.64:27961", "46.38.48.64:27962",
	"q3df.ru:27971", "q3df.ru:27972",
	"109.123.152.71:27200"

];

//const list = ["q3.vixterra.com:27960", "138.197.162.183:27960"];
// our tables has to have a list to read from, which can be updated
var ips = iplist.fromList(list);
// create serverdata from our ip list (ping each ip, process results..)
//let ips = q3master.fromMaster("master.quake3arena.com", "27950");
//ips.refresh();
var serverData = serverdata.from(ips);
serverData.update();

setInterval(() => {
		ips.refresh();
	}, 6000);

setInterval(() => {
		serverData.update();
	}, 5000);


app.use("/", index);
const api = require('./routes/api').withServerData(serverData);
app.use("/api", api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
