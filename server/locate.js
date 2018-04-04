const path = require('path');
const request = require('request');
const country = require(path.join(__dirname, "./country.js"));
const config = require(path.join(__dirname, '../secret_config'));

const COUNTRY_UNKNOWN = {
    countryName: "Unknown",
    countryCode: "??",
};

function withLocationProperty(o, cb) {
	for(let key in o) {
		let i = key.toUpperCase().indexOf("LOCATION");
		if(i >= 0) {
            return cb(undefined, o[key]);
		}
	}
}

function locateServerFromDoc(doc, cb) {
    const out = {
        countryName: COUNTRY_UNKNOWN.countryName,
        countryCode: COUNTRY_UNKNOWN.countryCode
    };
	withLocationProperty(doc.rules, (err, value) => {
		if(err) { 
			return cb(err);
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

    if (out.countryName === COUNTRY_UNKNOWN.countryName) {
		geolocate(doc.address, cb);
	}
	else {
		return cb(undefined, out);
	}
}

const api_key = process.env.GEO_KEY || config.GEO_KEY;
const api_no = (process.env.NO_GEO === "true");
if (process.env.NO_GEO == "true") {
    console.log("GEOLOCATE disabled");
}

const api_base = "http://api.ipstack.com";

function geolocate(ip, cb) {
    if (api_no) {
        return cb(undefined, COUNTRY_UNKNOWN);
    }
    const target = `${api_base}/${ip}?access_key=${api_key}`;
    console.log(`geolocate @ ${target}`);
	request(target, function(err, res, body) {
		if(err) cb(err);
        if (res && res.statusCode !== 200) {
            console.log(
                `Bad response status on geolocation req: ${res.statusCode}`);
            
		}
		if(body) {
            const data = JSON.parse(body);
            if (data.error) {
                console.log(`geoloc error::${data.error.type}
${data.error.info}`)
            }
			//console.log("Got geolocation response");
			//console.dir(data);
			else return cb(undefined, {
				countryName: data.country_name,
				countryCode: data.country_code,
				state: data.region_name,
			});
		}
        return cb(undefined, COUNTRY_UNKNOWN);
	});
}


module.exports = {
	findServer: locateServerFromDoc,
    unknown: COUNTRY_UNKNOWN,
};
