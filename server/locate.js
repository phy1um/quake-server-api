const path = require('path');
const request = require('request');
const country = require(path.join(__dirname, "./country.js"));
const config = require(path.join(__dirname, '../secret_config'));

function withLocationProperty(o, cb) {
	for(let key in o) {
		let i = key.toUpperCase().indexOf("LOCATION");
		if(i >= 0) {
			cb(undefined, o[key]);
			return;
		}
	}
}

function locateServerFromDoc(doc, cb) {
	const out = {countryName: "Unknown", countryCode: "UK"};
	withLocationProperty(doc.rules, (err, value) => {
		if(err) { 
			cb(err);
		}

		const parts = value.split(",");
		for(let i = 0; i < parts.length; i++) {
			const test = parts[i].trim();
			if(country.isCountry(test)) {
				out.countryName = test;
				break;
			}
			else if(country.isUSState(test)) {
				out.countryName = "United States";
				out.state = test;
				break;
			}
		}
		out.countryCode = country.codeFromName(
					out.countryName);
	});

	if(out.countryName === "Unknown") {
		const country = geolocate(doc.address, cb);
	}
	else {
		cb(undefined, out);
	}
}

const api_key = process.env.GEO_KEY || config.GEO_KEY;
const api_base = "http://api.ipstack.com";
function geolocate(ip, cb) {
	const target = `${api_base}/${ip}?access_key=${api_key}`;
	request(target, function(err, res, body) {
		if(err) cb(err);
		if(res && res.statusCode !== 200) {
			cb(new Error(`Bad status code on geolocation request: ${res.statusCode}`));
		}
		if(body) {
			const data = JSON.parse(body);
			//console.log("Got geolocation response");
			//console.dir(data);
			cb(undefined, {
				countryName: data.country_name,
				countryCode: data.country_code,
				state: data.region_name,
			});
		}
		else {
			cb(new Error("No body in geolocation response"));
		}
	});
}


module.exports = {
	findServer: locateServerFromDoc,
	unknown: {
		countryName: "UNKNOWN",
		countryCode: "??"
	}
};
