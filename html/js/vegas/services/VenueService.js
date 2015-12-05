/**
 * Venue service class to process event business flow and include other data access object(dao) based business
 */
function VenueService(){
	this.venueDao = new VenueImpl();
}


VenueService.prototype = new AbstractService();


VenueService.prototype.get = function(venueId){
	this.venueDao.get(venueId);
};