var request = require('request');
var async = require('async');
var config = require('./config').config;

exports.handler = function(event, context) {
	async.waterfall([
		async.apply(geocodeAddress, event.address),
		lookupPollingLocation
		], 
		// Render response to user.
		function renderResponse(error, place, geo) {
			if(!error) {
				var location = JSON.parse(place);
				var coordinates = JSON.parse(geo);
				location.address = coordinates.candidates[0].address;
				location.x = coordinates.candidates[0].location.x;
				location.y = coordinates.candidates[0].location.y;
				context.succeed(location);
			}
			else {
				context.fail(new Error('Could not locate address: ' + error));
			}
	});
};

// Geocode an address.
function geocodeAddress(address, callback) {
	var url = config.geo_url.replace('%address%', encodeURIComponent(address))
	request(url, function(error, response, body) {
		callback(error, body);
	});
}

// Look up polling location using division & ward.
function lookupPollingLocation(geo, callback) {
	// Parse response fron geocoding API.
	var geo_object = JSON.parse(geo).candidates[0].attributes
	// Get ward & division for polling location lookup.
	var division = geo_object.division.substring(2,4);
	var ward = geo_object.division.substring(0,2);

	var url = config.poll_url.replace('%ward%', division).replace('%division%', ward);
	request(url, function(error, response, body) {
		callback(error, body, geo)
	});
}