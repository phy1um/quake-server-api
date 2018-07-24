const path = require('path');
const fs = require('fs');
const request = require('request');
const country = require(path.join(__dirname, "./country.js"));
const config = require(path.join(__dirname, '../secret_config'));

const COUNTRY_UNKNOWN = {
    countryName: "Unknown",
    countryCode: "??",
};
// search object for key containing the characters 'loc' and use the
//  value at matching keys as argument to cb()
function withLocationProperty(o, cb) {
    for(let key in o) {
        let i = key.toUpperCase().indexOf("LOC");
        if(i >= 0) {
            cb(undefined, o[key]);
            return;
        }
    }
}

// go from a document to a country location
function locateServerFromDoc(doc, cb) {
    const out = {
        countryName: COUNTRY_UNKNOWN.countryName,
        countryCode: COUNTRY_UNKNOWN.countryCode
    };
	withLocationProperty(doc.rules, (err, value) => {
		if(err) {
			return cb(err);
		}
        // TODO: implement x-* field location identification

        // first test for country names AND US states
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

    // if we didn't find a country in a location field, geolocate
    if(out.countryName === "Unknown") {
        geolocate(doc.address, cb);
    }
    // otherwise return what we calculated
    else {
        cb(undefined, out);
    }
}

const api_key = process.env.GEO_KEY || config.GEO_KEY;
// test for disabled geolocation
const api_no = (process.env.NO_GEO === "true");
if (process.env.NO_GEO == "true") {
    console.log("GEOLOCATE disabled");
}


const api_base = "http://api.ipstack.com";
// make geolocation requests from given IP to ipstack
function geolocate(ip, cb) {
    if(api_no) {
        return cb(undefined, COUNTRY_UNKNOWN);
    }
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


// make a location cache so that we don't blow out our ipstack allowence
const cache = "serverLoc.cache";
// expire entries after 30 days
const TTL = 30 * 24 * 60 * 60;
let locationCache = {};

// try to load a cache from file
function loadLocationCache() {
    const now = new Date() / 1000;
    fs.readFile(cache, function(err, data) {
        if(err) {
            // catch non existent file, this isn't a throw-worthy error
            if(err.code === "ENOENT") {
                return console.log("No location cache file exists");
            }
            else throw err;
        }
        const locs = JSON.parse(data);
        let restoreCount = 0;
        for(let key in locs) {
            const l = locs[key];
            // if the document has lived too long in cache..
            if(l.updated && l.updated + TTL < now) {continue;}
            else { locationCache[key] = l; restoreCount++; }
        }
        console.log(`Restored ${restoreCount} from location cache`);
    });
}

// write cache to file as JSON
function writeLocationCache() {
    console.log("Writing location cache");
    const out = JSON.stringify(locationCache, null, 0);
    fs.writeFile(cache, out, function(err) {
        if(err) throw err;
    });
}

// load from file on run
loadLocationCache();
// write to file at some interval
setInterval(writeLocationCache, config.CACHE_WRITE_RATE || 60000);

// TODO: refactor name
function writeLocationToFile(doc) {
    // write document's location as COPY to cache
    const now = new Date() / 1000;
    const l = {
        countryName: doc.location.countryName,
        countryCode: doc.location.countryCode,
        state: doc.location.state,
        updated: now
    };
    const key = `${doc.address}:${doc.port}`;
    locationCache[key] = l;
}

module.exports = {
    findServer: locateServerFromDoc,
    toFile: writeLocationToFile,
    unknown: COUNTRY_UNKNOWN,
};
