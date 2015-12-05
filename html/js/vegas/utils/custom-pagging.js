/** For Move Previous / Move Next Button **/


var PREV_URL_LIST		= "previousUrlList";
var CURRENT_URL			= "currentUrl";
var NEXT_URL			= "nextUrl";
var API_METHOD			= "apiMethod";
var START_URL			= "startUrl";
var TOTAL_ITEMS			= "totalItemPerPage";





function initPaginationUrl(specificSelector){
	var previousUrlList = new Array();
	
	var selector = PAGE_BODY_SELECTOR;
	if(specificSelector != undefined){
		selector = specificSelector;
	}
	
	//set URL Key to DOM
	setDomStorage(selector, PREV_URL_LIST, previousUrlList);
	setDomStorage(selector, CURRENT_URL, undefined);
}


function populateNextUrl(nextUrl, specificSelector){
	var selector = PAGE_BODY_SELECTOR;
	if(specificSelector != undefined){
		selector = specificSelector;
	}
	
	var currentUrl = getDomStorage(selector, CURRENT_URL);
	var preUrlList = getDomStorage(selector, PREV_URL_LIST) || [];
	//console.log('Move next with nextUrl: ' + nextUrl + ' and currentUrl: ' + currentUrl);
	
	//set previous url
	if(currentUrl == START_URL){
		preUrlList.push(undefined);
	}
	else{
		if(nextUrl != currentUrl){
			preUrlList.push(currentUrl);
		}
	}
	setDomStorage(selector, PREV_URL_LIST, preUrlList);
	
	//set current currentUrl
	setDomStorage(selector, CURRENT_URL, nextUrl);
}


function controlPreviousNext(currentPage, nextUrl, totalItems, prevHandler, nextHandler, freeTextSearch, specificSelector){
	var selector = PAGE_BODY_SELECTOR;
	if(specificSelector != undefined){
		selector = specificSelector;
	}
	
	var previousUrlList = getDomStorage(selector, PREV_URL_LIST);
	var previous = $("#"+currentPage+"MovePrevious");
	var next = $("#"+currentPage+"MoveNext");
	
	//Enable previous and next
	enablePaggingButton(previous, prevHandler);
	enablePaggingButton(next, nextHandler);
	
	//First record, disable previous
	if(previousUrlList == undefined || previousUrlList.length == 0 || totalItems == 0){
		disablePaggingButton(previous);
	}
	
	//Last record, disable next
	if(totalItems < PAGE_SIZE){
		disablePaggingButton(next);
	}
	else{
		if(isValidNextUrl(nextUrl)){
			var invokeMethod = getApiMethodDom(currentPage);
			var requestData = nextUrl;
			//Only for search cocktail in Bacardi Project
			if(freeTextSearch && freeTextSearch.length > 0){
				requestData.query = freeTextSearch;
			}
			invokeMethod.apply(apiRequester, [requestData, function(data){
				if(data.items.length == 0 && (data.cursorKey == undefined || data.nextUrl == undefined)){
					disablePaggingButton(next);
				}
			}, failureHandler]);
		}
		else{
			disablePaggingButton(next);
		}
	}
	
}


function getSwitchRequestData(currentUrl, currentPage){
	var totalItems = getTotalItems();
	var pageStatusMode = getDomStorage(PAGE_HEADER_SELECTOR, PAGE_STATUS_MODE);
	
	var requestData = getCurrentRequestData(currentUrl);
	if(pageStatusMode == DELETE_PAGE_MODE && totalItems != undefined){
		requestData = getRequestDataForRefreshPage(currentPage, totalItems);
		setDomStorage(PAGE_HEADER_SELECTOR, PAGE_STATUS_MODE, HOME_PAGE_MODE);
	}
	
	return requestData;
}


function getRequestDataForRefreshPage(currentPage, nrOfItems){
	var currentUrl = getDomStorage(PAGE_BODY_SELECTOR, CURRENT_URL);
	var nextUrl = getDomStorage($("#"+currentPage+"MoveNext"), NEXT_URL);
	//console.log('nrOfItems: ['+nrOfItems+'] with currentUrl: ['+requestData+'] and nextUrl: ['+nextUrl+']');
	
	//Get current URL
	var requestData = getCurrentRequestData(currentUrl);
	
	//No number of items display
	if(nrOfItems == 1){
		
		if(isValidNextUrl(nextUrl)){
			//Get next URL
			requestData = nextUrl;
		}
		else{
			//Get previous URL
			requestData = getRequestDataForPreviousSearch(new Object());
		}
	}
	
	return requestData;
}


function getRequestDataForPreviousSearch(defaultRequestData, specificSelector){
	var requestData = defaultRequestData;
	
	var selector = PAGE_BODY_SELECTOR;
	if(specificSelector != undefined){
		selector = specificSelector;
	}
	
	//get previous url from last item
	var previousUrl = getPreviousUrl(selector);
	
	//set current url
	var currentUrl = START_URL;
	if(previousUrl != undefined){
		currentUrl = previousUrl;
		requestData = previousUrl;
	}
	setDomStorage(selector, CURRENT_URL, currentUrl);
	
	return requestData;
}


function getPreviousUrl(selector){
	var previousUrl = undefined;
	var previousUrlList = getDomStorage(selector, PREV_URL_LIST);
	
	if(isValidString(previousUrlList)){
		previousUrl = previousUrlList.pop();
	}
	//console.log('Move previous with previousCursor: ' + previousUrl);
	
	return previousUrl;
}


function getNextUrl(data){
	var nextUrl = data.nextUrl;
	if(nextUrl != undefined){
		nextUrl = nextUrl.substring(1);
	}
	else{
		nextUrl = "";
		if(data.cursorKey != undefined){
			nextUrl = {cursorKey : data.cursorKey};
		}
	}
	
	return nextUrl;
}


function getCurrentRequestData(currentUrl){
	var requestData = {};
	
	if(isCurrentRequestData(currentUrl)){
		requestData = currentUrl;
	}
	
	return requestData;
}


/**
 * Set current & Previous to DOM
 * @param currentUrl
 * @param preUrlList
 */
function setCurrentAndPrevUrlDom(currentUrl, preUrlList){
	if(isCurrentRequestData(currentUrl)){
		setDomStorage(PAGE_BODY_SELECTOR, PREV_URL_LIST, preUrlList);
		setDomStorage(PAGE_BODY_SELECTOR, CURRENT_URL, currentUrl);
	}
}


/**
 * To identify current request
 * @param currentUrl
 * @returns {Boolean}
 */
function isCurrentRequestData(currentUrl){
	
	return (currentUrl != undefined && currentUrl != START_URL);
}


/**
 * To make sure next URL is valid
 * @param nextUrl
 * @returns {Boolean}
 */
function isValidNextUrl(nextUrl){
	var isValid = false;
	
	if(nextUrl != undefined){
		isValid = true;
		if(isString(nextUrl) && nextUrl.length == 0){
			isValid = false;
		}
	}
	
	return isValid;
}


/**
 * Disable Next & Previous Button when load page
 * @param currentPage
 */
function initDisablePaggingButton(currentPage){
	disablePaggingButton($("#"+currentPage+"MovePrevious"));
	disablePaggingButton($("#"+currentPage+"MoveNext"));
}


/**
 * Enable Next & Previous Button
 * @param selector
 * @param handleClick
 */
function enablePaggingButton(selector, handleClick){
	if(selector.hasClass("disabled")){
		setOnButtonClickListener(selector, handleClick);
		switchCssClass(selector, "disabled", "active");
	}
}


/**
 * Disable Next & Previous Button
 * @param selector
 */
function disablePaggingButton(selector){
	offClickButtonAction(selector);
	switchCssClass(selector, "active", "disabled");
}


/**
 * Set total items to pageContainer
 * @param listSelector
 */
function setTotalItems(listSelector){
	var noOfItems = getNoOfItems(listSelector);
	
	setDomStorage(PAGE_CONTAINER_SELECTOR, TOTAL_ITEMS, noOfItems);
}


/**
 * Get total items from pageContainer
 * @returns
 */
function getTotalItems(){
	var totalItems = getDomStorage(PAGE_CONTAINER_SELECTOR, TOTAL_ITEMS);
	
	return totalItems;
}


/**
 * Set next URL to Next Button
 * @param currentPage
 * @param nextUrl
 */
function setNextUrlDom(currentPage, nextUrl){
	
	setDomStorage($("#"+currentPage+"MoveNext"), NEXT_URL, nextUrl);
}


/**
 * Get next URL from Next Button
 * @param currentPage
 * @returns next URL
 */
function getNextUrlDom(currentPage){
	var nextUrl = getDomStorage($("#"+currentPage+"MoveNext"), NEXT_URL);
	
	return nextUrl;
}


/**
 * Set API to Next or Previous Button
 * @param currentPage
 * @param apiMethodName
 */
function setApiMethodDom(currentPage, apiMethodName){
	
	setDomStorage($("#" + currentPage + "MovePrevious,#" + currentPage + "MoveNext"), API_METHOD, apiMethodName);
}


/**
 * Get API from Next or Previous Button
 * @param currentPage
 * @returns API
 */
function getApiMethodDom(currentPage){
	var apiMothod = getDomStorage($("#" + currentPage + "MovePrevious,#" + currentPage + "MoveNext"), API_METHOD);
	
	return apiMothod;
}


/**
 * Get total number of items
 * @param listSelector
 * @returns number of items
 */
function getNoOfItems(listSelector){
	var nrOfItems = listSelector.length;//listSelector.size() for DIV
	
	return nrOfItems;
}


/**
 * Clear API from Next or Previous Button
 * @param currentPage
 */
function removeApiMethodDom(currentPage){
	
	removeDomStorage($("#" + currentPage + "MovePrevious,#" + currentPage + "MoveNext"), API_METHOD);
}


/**
 * Clear next URL from Next Button
 * @param currentPage
 */
function removeNextUrlDom(currentPage){
	
	removeDomStorage($("#"+currentPage+"MoveNext"), NEXT_URL);
}


/**
 * Clear next, current, and prev URL from DOM
 * @param currentPage
 */
function clearDomData(currentPage){
	removeNextUrlDom(currentPage);
	clearCurrentUrlAndPrevUrlDomData();
}


/**
 * Clear current && Prev URl from DOM
 * @param specificSelector
 */
function clearCurrentUrlAndPrevUrlDomData(specificSelector){
	var selector = PAGE_BODY_SELECTOR;
	if(specificSelector != undefined){
		selector = specificSelector;
	}
	
	removeDomStorage(selector, CURRENT_URL);
	removeDomStorage(selector, PREV_URL_LIST);
}