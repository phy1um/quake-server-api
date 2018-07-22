const path = require('path');
const fs = require('fs');
const request = require('request');
const country = require(path.join(__dirname, "./country.js"));
const config = require(path.join(__dirname, '../secret_config'));

// search object for key containing the characters 'location' and use the
//  value at matching keys as argument to cb()
function withLocationProperty(o, cb) {
    for(let key in o) {
        let i = key.toUpperCase().indexOf("LOCATION");
        if(i >= 0) {
            cb(undefined, o[key]);
            return;
        }
    }
}

// go from a document to a country location
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
const api_base = "http://api.ipstack.com";
function geolocate(ip, cb) {
    if(process.env.NO_GEO) {
        return cb(new Error(`No geolocation requests allowed`));
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


const cache = "serverLoc.cache";
// refresh every 30 days
const TTL = 30 * 24 * 60 * 60;
let locationCache = {};

function loadLocationCache() {
    const now = new Date() / 1000;
    fs.readFile(cache, function(err, data) {
        if(err) {
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

function writeLocationCache() {
    console.log("Writing location cache");
    const out = JSON.stringify(locationCache, null, 0);
    fs.writeFile(cache, out, function(err) {
        if(err) throw err;
    });
}

// load from file on first load
loadLocationCache();
// write to file at some interval
setInterval(writeLocationCache, config.CACHE_WRITE_RATE || 60000);

function writeLocationToFile(doc) {
    // read JSON from file, insert document, write back to file
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
    unknown: {
        countryName: "UNKNOWN",
        countryCode: "??"
    }
};
