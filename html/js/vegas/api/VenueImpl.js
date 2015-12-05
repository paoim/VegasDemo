/**
 * Venue Implementation interact backend api through jquery ajax
 */
function VenueImpl() {}


/* PackageBackendAPI class extend BaseBackendAPI class*/
VenueImpl.prototype = new BaseJSNetwork();


VenueImpl.prototype.get = function(venueId){
	console.log("get api " + venueId);
};