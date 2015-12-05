/*************************************************************
**	create base backend api class for next extend
*************************************************************/

function APIRequest() {}

/* PackageBackendAPI class extend BaseBackendAPI class*/
APIRequest.prototype = new BaseJSNetwork();

//APIRequest.prototype.baseBackendUrl = getApiUrl();
APIRequest.prototype.baseBackendUrl = "/api/vegas/";

//APIRequest.prototype.oauthUrl = getOauthUrl();
APIRequest.prototype.oauthUrl = "/oauth/vegas/";


APIRequest.prototype.getUploadFileUrl = function(requestData,responseHandler,failureHandler){
	requestData = addAccessTokenParam(requestData);
	var requestUrl = this.baseBackendUrl + "blob/v10";
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.getMe = function(requestData,responseHandler,failureHandler) {
	var requestUrl = this.oauthUrl + "user/me";
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.getUser = function(requestData,responseHandler,failureHandler) {
	var requestUrl = this.baseBackendUrl + "user/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.registerFederated = function(requestData,responseHandler,failureHandler) {
	var requestUrl = this.baseBackendUrl + "federated";
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};



/********************************** EVENT API **********************************/

APIRequest.prototype.getEventPage = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "event/v10";
	this.getRequest(requestUrl, getExtraParam(requestData, PAGE_SIZE), responseHandler, failureHandler);
};


APIRequest.prototype.getEvent = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "event/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.createEvent = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "event/v10";
	requestData = addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};

APIRequest.prototype.updateEvent = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "event/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData =  addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.deleteEvent = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "event/v10/" + requestData.pathVariable + "?" + $.param(addAccessTokenParam(new Object()));
	delete requestData.pathVariable;
	this.deleteRequest(requestUrl, responseHandler, failureHandler);
};



/********************************** VENUE API **********************************/

APIRequest.prototype.getVenuePage = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "venue/v10";
	this.getRequest(requestUrl, getExtraParam(requestData, PAGE_SIZE), responseHandler, failureHandler);
};


APIRequest.prototype.getVenue = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "venue/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.createVenue = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "venue/v10";
	requestData = addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};

APIRequest.prototype.updateVenue = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "venue/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData =  addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.deleteEvent = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "venue/v10/" + requestData.pathVariable + "?" + $.param(addAccessTokenParam(new Object()));
	delete requestData.pathVariable;
	this.deleteRequest(requestUrl, responseHandler, failureHandler);
};



/********************************** CATEGORY API **********************************/

APIRequest.prototype.getCategoryPage = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10";
	this.getRequest(requestUrl, getExtraParam(requestData, PAGE_SIZE), responseHandler, failureHandler);
};


APIRequest.prototype.getCategory = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.getSubCategoryByMainCategories = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/mainCategories";
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.getSubCategoryByMainCategoryId = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/byMainCategory/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.getSubCategoryByMainCategoryName = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/byMainCategoryName";
	requestData = addAccessTokenParam(requestData);
	this.getRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.createCategory = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10";
	requestData = addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};

APIRequest.prototype.updateCategory = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/" + requestData.pathVariable;
	delete requestData.pathVariable;
	requestData =  addAccessTokenParam(requestData);
	this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
};


APIRequest.prototype.deleteCategory = function(requestData,responseHandler,failureHandler){
	var requestUrl = this.baseBackendUrl + "category/v10/" + requestData.pathVariable + "?" + $.param(addAccessTokenParam(new Object()));
	delete requestData.pathVariable;
	this.deleteRequest(requestUrl, responseHandler, failureHandler);
};