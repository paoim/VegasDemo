/**
 * Home class to include common methods to be used in each domain controller
 */
function HomeController(){}


var PAGE_SIZE						= 200;
var UNAUTHORIZED_RESPONSE_CODE		= 403;

var LINK_TO_CREAVE_NEW_VENUE_VENUE	= 0;
var LINK_TO_CREAVE_NEW_VENUE_EVENT	= 1;
var LINK_TO_EDIT_VENUE_VENUE		= 2;
var LINK_TO_EDIT_VENUE_EVENT		= 3;

var EVENT_ITEM						= "eventItem";
var VENUE_ITEM						= "venueItem";
var VENUE_FLAG						= "venueFlag";
var EVENT_PAGE_ITEM					= "eventPageItem";

var EVENT_MENU_PAGE					= "eventMenu";
var EVENT_DETAIL_PAGE				= "eventDetail";
var VENUE_DETAIL_PAGE				= "venueDetail";

var HTML_EXTENSION					= ".html";
var HOME_CONTAINER_SELECTOR			= $("#homeContainer");
var NO_INTERNET_CONNECTION			= "You are currently not connected to internet, please check your internet connection.";


HomeController.prototype.init = function(){
	
	//Setup Authorization header for every request
	setupRequestHeader("vegas:vegas");
	
	//Click on each MENU item
	setListItemListener($("#menu li"), onClickMenuItem);
	
	// select Events as default
	setEventsSelected();
	
	// select Venue as default
	//setVenuesSelected();
};


function onClickMenuItem(selector){
	var pageName = $(selector).attr("id");
	
	//Load content page
	loadPage(HOME_CONTAINER_SELECTOR, pageName);
}


function onClickAzSearchListener(button){
	var az = $(button).attr("id");
	console.log(az);
}


function setupRequestHeader(defaultToken){
	
	jQuery.ajaxSetup({
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', ("Basic " + window.btoa(defaultToken)));
		},
	});
	
}


function loadPage(selector, pageName, onSuccess){
	var xhtmlPageName = pageName + HTML_EXTENSION;
	
	loadHtmlContent(selector, xhtmlPageName, onSuccess);
}


function loadHtmlContent(selector, html, onSuccess){
	
	//Load content page
	selector.load(html, function(response, status, xhr){
		if(status == "error"){
			var msgError = "There was an error: " + xhr.status + " " + xhr.statusText;
			if(xhr.status == 0){
				msgError = NO_INTERNET_CONNECTION;
			}
			
			alert(msgError);
		}
		else{
			if(onSuccess != undefined){
				onSuccess();
			}
		}
	});
}


function setEventsSelected(){
	$("#menu li:first").trigger("click");
}


function setVenuesSelected(){
	$("#menu li:nth(1)").trigger("click");
}


/**
 * Handle fail ajax request
 */
function failureHandler(jqXHR, textStatus, errorThrown){
	
	var responseStatus = jqXHR.status; 
	if(UNAUTHORIZED_RESPONSE_CODE == responseStatus){
		document.location = "/index.html";
	}
}


function initVenueListItems(venueSelector, templateSelector, itemStringHandler){
	var venueList = [
	                 {id : 1, name : "Absinthe", address : "Flamingo Rd and Las Vegas Blvd.", phone : "", webUrl : "", callback : itemStringHandler},
	                 {id : 2, name : "AMC Rainbow Promenade 10", address : "2321 North Rainbow Blvd.", phone : "", webUrl : "", callback : itemStringHandler},
	                 {id : 3, name : "AMC Twon Square 18", address : "6587 Las Vegas Blvd. South", phone : "", webUrl : "", callback : itemStringHandler},
	                 {id : 4, name : "Anthony Cools", address : "3655 Las Vegas Blvd.", phone : "", webUrl : "", callback : itemStringHandler},
	                 {id : 5, name : "Art Square Theatre", address : "1025 1st St", phone : "", webUrl : "", callback : itemStringHandler}
	                ];
	
	//Display Venues List
	populateVenueslist(venueList, venueSelector, templateSelector);
	
//	var requestData = {};
//	apiRequester.getVenuePage(requestData, function(venue){
//		venueList = [];
//		$.map(venue.items, function(item){
//			var venueItem = {id : item.id, name : item.name, address : item.street + ', ' + item.city + ', ' + item.country, phone : "", webUrl : "", callback : itemStringHandler};
//			venueList.push(venueItem);
//		});
//		
//		//Display Venues List
//		populateVenueslist(venueList, venueSelector, templateSelector);
//		
//	}, failureHandler);
	
}


function populateVenueslist(venueList, venueSelector, templateSelector){
	
	//Clear old Venue list items
	venueSelector.html("");
	
	//Add new Venue list items
	$.map(venueList, function(item){
		var venueListTmpl = templateSelector.tmpl(item);
		
		setDomStorage(venueListTmpl, VENUE_ITEM, item);
		venueListTmpl.appendTo(venueSelector);
	});
}


function openVenueDetailPage(){
	
	//Open #210 Create New/View/Edit Venue
	loadPage(HOME_CONTAINER_SELECTOR, VENUE_DETAIL_PAGE);
}