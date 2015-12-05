

//Get request parameters from url with start by #
function getParameterByName(name, responseUrl) {
	//console.log(window.location);
	//var match = RegExp('[?#&]' + name + '=([^&]*)').exec(window.location);
	//return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	
	if(responseUrl == undefined){
		responseUrl = window.location.search;
	}
	
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(responseUrl);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/**
 * 
 * @param name
 * @returns {Boolean}
 */
function getFragmentByName(name) {

	var match = RegExp('[&#]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


function setUserProfile(user_profile){
	
	setLocalStorages("user_profile", user_profile);
}


function getUserProfile(){
	
	return getLocalStorages("user_profile");
}


function removeUserProfile(){
	
	removeLocalStorage("user_profile");
}


/**
 * Store access token in header tag
 * @param oauthUrl
 */
function setAccessToken(access_token) {
	
	setLocalStorage("access_token", access_token);
}


/**
 * Get access token from html header
 * @returns
 */

function getAccessToken() {
	
	return getLocalStorage("access_token");
}


function removeAccessToken(){
	
	removeLocalStorage("access_token");
}


function setExpiresIn(expires_in){
	
	setLocalStorage("expires_in", expires_in);
}


function getExpiresIn(){
	
	return getLocalStorage("expires_in");
}


function removeExpiresIn(){
	
	removeLocalStorage("expires_in");
}


function setProviderId(providerId){
	
	setLocalStorage("providerId", providerId);
}


function getProviderId(){
	
	return getLocalStorage("providerId");
}


function removeProviderId(){
	
	removeLocalStorage("providerId");
}


/**
 * Store api url in localStorage object
 * @param apiUrl
 */
function setApiUrl(apiUrl){
	
	setLocalStorage("apiUrl", apiUrl);
}


/**
 * Get api url from localStorage object
 * @returns
 */
function getApiUrl(){
	
	return getLocalStorage("apiUrl");
}


function removeApiUrl(){
	
	removeLocalStorage("apiUrl");
}


/**
 * Store Oauth url in localStorage object
 * @param oauthUrl
 */
function setOauthUrl(oauthUrl){
	
	setLocalStorage("oauthUrl", oauthUrl);
}


/**
 * Get Oauth url from localStorage object
 * 
 * @returns string of Oauth url
 */
function getOauthUrl(){
	
	return getLocalStorage("oauthUrl");
}


/**
 * Store signin url in localStorage object
 * @param signinUrl
 */
function setSigninUrl(signinUrl){
	
	setLocalStorage("signinUrl", signinUrl);
}


/**
 * Get Signin url from localStorage object
 * @returns
 */
function getSigninUrl(){
	
	return getLocalStorage("signinUrl");
}


/** ===================================================== **
 *                  Local Storage                         
 ** ===================================================== **/

function setLocalStorage(key, value){
	localStorage.setItem(key, value);
}


function getLocalStorage(key){
	
	return localStorage.getItem(key);
}


/**
 * Store list of items in localStorage object
 * @param key
 * @param itemsJson
 */
function setLocalStorages(key, itemsJson){
	var itemsJSONText = JSON.stringify(itemsJson);
	setLocalStorage(key,itemsJSONText);
}


/**
 * Get list of items from localStorage object
 * @param key
 * @returns itemsJson
 */
function getLocalStorages(key){
	var items = getLocalStorage(key);
	var itemsJson = JSON.parse(items);
	
	return itemsJson;
}


/**
 * Remove one key from Local Storage Object
 * @param key
 */
function removeLocalStorage(key){
	localStorage.removeItem(key);
}

/**
 * Clear all keys from Local Storage Object
 */
function clearLocalStorage(){
	localStorage.clear();
}





/** ===================================================== **
 *                  Session Storage                      
 ** ===================================================== **/


/**
 * Store value in sessionStorage object
 */
function setSessionStorage(key, value){
	sessionStorage.setItem(key, value);
}

function getSessionStorage(key){
	
	return sessionStorage.getItem(key);
}


/**
 * Store list of items in sessionStorage object
 * @param key
 * @param items
 */
function setSessionStorages(key, items){
	var itemJSONText = JSON.stringify(items);
	setSessionStorage(key, itemJSONText);
}


/**
 * Get list of items from sessionStorage object
 * @param key
 * @returns
 */
function getSessionStorages(key){
	var items = getSessionStorage(key);
	var itemJson = JSON.parse(items);
	
	return itemJson;
}


/**
 * Remove one key from Session Storage Object
 * @param key
 */
function removeSessionStorage(key){
	sessionStorage.removeItem(key);
}

/**
 * Clear all keys from Session Storage Object
 */
function clearSessionStorage(){
	sessionStorage.clear();
}



/** ================= DOM Storage ================= **/


/**
 * Set data in Dom Object
 * @param selector
 * @param key
 * @param value
 */
function setDomStorage(selector, key, value){
	selector.data(key, value);
}


/**
 * Get data from Dom Object
 * @param selector
 * @param key
 * @returns data
 */
function getDomStorage(selector, key){
	var data = selector.data(key);
	
	return data;
}


/**
 * Remove data from Dom Object
 * @param selector
 * @param key
 */
function removeDomStorage(selector, key){
	selector.removeData(key);
}



/** =========== Others ============== **/





/**
 * Switch css class with jquery
 * @param selector
 * @param oldClass
 * @param newClass
 */
function switchCssClass(selector,oldClass,newClass){
	selector.removeClass(oldClass);
	selector.addClass(newClass);
}


/**
 * Keep current focus on text when Press Enter key for IE9
 * @param inputSelector
 */
function keepSetFocusInputText(inputSelector){
	//inputSelector.bind("keydown", function(e) {
	inputSelector.live("keydown", function(e) {
		if (e.which == 13){ //Enter key
			e.preventDefault(); //to skip default behavior of the enter key
		}
	});
}


/**
 * Automatically generate javascript object from all text fields in the container elements
 * All text fields must start with key prefix 
 * 
 * @returns {Object}
 */
function generateRequestData(filters, prefix){
	var requestData = new Object();
	$(filters).each(function(){
		var data = $(this).attr("id");
		if(prefix != undefined){
			data = data.substring(prefix.length);
		}
		
		var value = $(this).val();
		var trimValue = trimString(value);
		//console.log(value + "[" + value.length + "]" + " with " + trimValue + "[" + trimValue.length + "]");
		
		requestData[data] = trimValue;
	});
	
	return requestData;
}


/**
 *  Get Base URL
 * @returns baseUrl
 */
function getBaseUrl() {
	return 'http://' + location.hostname + (location.port ? ':' + location.port: '');
}


/**
 * Get extra param with access_token and pageSize
 * @param requestData
 * @param pageSize
 * @returns
 */
function getExtraParam(requestData, pageSize){
	requestData = addAccessTokenParam(requestData);
	if(isString(requestData)){
		if(!(requestData.search("pageSize=") > -1)){
			requestData = requestData + '&pageSize=' + pageSize;
		}
	}
	else{
		requestData.pageSize = pageSize;
	}
	
	return requestData;
}


/**
 * add access token parameter to request data
 *  
 * @param requestData
 * 			request data
 */
function addAccessTokenParam(requestData){
	var localAccessToken = getAccessToken();
	if(localAccessToken != null && localAccessToken != undefined){
		if(isString(requestData)){
			requestData = requestData + "&access_token=" + localAccessToken;
		}
		else{
			requestData.access_token = localAccessToken;
		}
	}
	return requestData;
}


/**
 * Get page size such as width or height
 * @returns
 */
function getPageSize() {
	var pageSize;
	
	var height = document.body.clientHeight;
	if (document.documentElement.scrollHeight > height) {
		height = document.documentElement.scrollHeight;
	}
	if (document.documentElement.clientHeight > height) {
		height = document.documentElement.clientHeight;
	}

	var width = document.body.clientWidth;
	if (document.documentElement.scrollWidth > width) {
		width = document.documentElement.scrollWidth;
	}
	if (document.documentElement.clientWidth) {
		width = document.documentElement.clientWidth ;
	}
	pageSize = new Array(width, height);
	return pageSize;
}


/**
 * Get Selector's width
 * @returns
 */
function getWidth(){
	xWidth = null;
	if(window.screen != null)
		xWidth = window.screen.availWidth;
	
	if(window.innerWidth != null)
		xWidth = window.innerWidth;
	
	if(document.body != null)
		xWidth = document.body.clientWidth;
	
	return xWidth;
}

/**
 * get screen width
 */
function getScreenWidth(){
	var screenWidth;
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != undefined) {
		screenWidth = window.innerWidth;
	}
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != undefined && typeof document.documentElement.clientWidth != undefined
		&& typeof document.documentElement.clientWidth != undefined) {
		screenWidth = document.documentElement.clientWidth;
	}
	//Older version of IE
	else{
		screenWidth = document.getElementsByTagName('body')[0].clientWidth;
	}
	
	return screenWidth;
}

/**
 * for landing page usering only, to detect for different browser screen
 */
function getImageSize(){
	var imageSize = "s";
	var screenWidth = getScreenWidth();
	if(screenWidth >= 320){
		imageSize =  "l";
	}
	else if(screenWidth > 160 && screenWidth <= 240){
		imageSize = "s";
	}else{
		imageSize = "m";
	}
	
	return imageSize;
}

/**
 * To get width of Selector
 * @param selector
 * @returns
 */
function getSelectorWidth(selector){
	//console.log(selector.width());
	//console.log(selector.outerWidth());
	//console.log(selector.outerWidth(true));//include margin
	
	return selector.width();
}



/*=================== String =======================*/




/**
 * Verify the input data is string obj
 *  
 * @param inputData
 * @returns {Boolean}
 */
function isString(inputData){
	return $.type(inputData) === "string";
}

/**
 * To trim left and right of String
 */
function trimString(str){
	var newStr = str;
	
	if(isValidString(str)){
		newStr = $.trim(str);
	}
	
	return newStr;
}

/**
 * To make sure that String is valid
 * @param str
 * @returns {Boolean}
 */
function isValidString(str){
	
	return (str != undefined && str.length > 0);
}