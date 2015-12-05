/**
 * Event service class to process event business flow and include other data access object(dao) based business
 */
function EventService(){
	this.eventDao = new EventImpl();
}

EventService.prototype = new AbstractService();


EventService.prototype.get = function(eventId, responseHandler, failureHandler){
	this.eventDao.get(eventId, this.baseBackendUrl, responseHandler, failureHandler);
};

EventService.prototype.getEventPage = function(requestData, responseHandler, failureHandler){
	this.eventDao.getEventPage(this.baseBackendUrl, requestData, responseHandler, failureHandler);
};

EventService.prototype.createEvent = function(requestData, responseHandler, failureHandler){
	this.eventDao.createEvent(this.baseBackendUrl, requestData, responseHandler, failureHandler);
};

EventService.prototype.updateEvent = function(eventId, requestData, responseHandler, failureHandler){
	this.eventDao.updateEvent(eventId, this.baseBackendUrl, requestData, responseHandler, failureHandler);
};

EventService.prototype.deleteEvent = function(eventId, responseHandler, failureHandler){
	this.eventDao.deleteEvent(eventId, this.baseBackendUrl, responseHandler, failureHandler);
};