/**
 * Event Implementation interact backend api through jquery ajax
 */
function EventImpl() {}

/* PackageBackendAPI class extend BaseBackendAPI class*/
EventImpl.prototype = new BaseJSNetwork();

EventImpl.prototype.get = function(eventId, baseBackendUrl, responseHandler, failureHandler){
	var requestData = {};
	//requestData = addAccessTokenParam(requestData);
	var requestUrl = baseBackendUrl + "event/v10/" + eventId;
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};

EventImpl.prototype.getEventPage = function(baseBackendUrl, requestData, responseHandler, failureHandler){
	var requestUrl = baseBackendUrl + "event/v10";
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};

EventImpl.prototype.createEvent = function(baseBackendUrl, requestData, responseHandler, failureHandler){
	var requestUrl = baseBackendUrl + "event/v10";
	//requestData = addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};

EventImpl.prototype.updateEvent = function(eventId, baseBackendUrl, requestData, responseHandler, failureHandler){
	//requestData =  addAccessTokenParam(requestData);
	var requestUrl = baseBackendUrl + "event/v10/" + eventId;
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};

EventImpl.prototype.deleteEvent = function(eventId, baseBackendUrl, responseHandler, failureHandler){
	var requestUrl = baseBackendUrl + "event/v10/" + eventId + "?" + $.param(addAccessTokenParam(new Object()));
	this.deleteRequest(requestUrl, responseHandler, failureHandler);
};