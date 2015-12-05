/**
 * Adapter class to integrate view and model object, ui event binding
 * 
 */
function EventController(){
	this.eventService = new EventService();
}


EventController.prototype = new HomeController();


EventController.prototype.init = function(){
	// call to super method
	//HomeController.prototype.init.call(this); 
	
	// bind event
	//console.log("EventController");
	
	//Click on Search button
	setOnClickListener($("#eventSearch"), onClickSearchEvent);
	
	//Click on Open Create New Event button
	setOnClickListener($("#createNewEvent"), onClickOpenCreateEvent);
	
	initEventFilterDropdown();
	
	initEventSortByDropdown();
	
	this.initEventListItems();
	
	//Display Pagination
	initEventPagination();
	
	//Set focus for first field
	$("#eventListContainer input[type='text']:first").focus();
};


function initEventFilterDropdown(){
	var eventFilters = ["Past events", "Shows", "Attractions", "Sightseeing Tours"];
	
	//Set value to single drop down
	setSingleDropdown($("#event_filter"), eventFilters);
}


function initEventSortByDropdown(){
	var eventSortBys = ["Active Deal", "Featured", "Sold total", "Sold today"];
	
	//Set value to single drop down
	setSingleDropdown($("#event_sortBy"), eventSortBys);
}


EventController.prototype.initEventListItems = function(){
	
	var eventSelector = $("#eventListItems");
	var eventsList = [
	                 {id : 1, icon : "event-icon-green", name : "Grand Canyon Explorer Tour", address : "Atlantic Air Terminal - Las Vegas, NV", sold : "0", today : "0", remaining : "40", featured : "YES", activeDeal : "NO", callback : "onClickEventItemListener"},
	                 {id : 2, icon : "event-icon-green", name : "Grand Canyon South Rim Tour", address : "Grand Canyon Adventure Tour - Williams, AZ", sold : "0", today : "0", remaining : "40", featured : "NO", activeDeal : "YES", callback : "onClickEventItemListener"},
	                 {id : 3, icon : "event-icon-green", name : "Hollywood Day Tour", address : "Hollywood Day Tour - Las Vegas, NV", sold : "0", today : "0", remaining : "100", featured : "NO", activeDeal : "NO", callback : "onClickEventItemListener"},
	                 {id : 4, icon : "event-icon-yellow", name : "Las Vegas MealTickets", address : "LV Power Pass - Las Vegas, NV", sold : "0", today : "0", remaining : "200", featured : "YES", activeDeal : "NO", callback : "onClickEventItemListener"},
	                 {id : 5, icon : "event-icon-purple", name : "Las Vegas Mobile Minister", address : "Las Vegas Mobile Minister - Handerson, NV", sold : "0", today : "0", remaining : "40", featured : "NO", activeDeal : "NO", callback : "onClickEventItemListener"},
	                 {id : 6, icon : "event-icon-purple", name : "Le Reve The Dream Theater", address : "Las Vegas Mobile Minister - Handerson, NV", sold : "0", today : "0", remaining : "40", featured : "NO", activeDeal : "NO", callback : "onClickEventItemListener"}
	                ];
	
	//Clear old Event list items
	eventSelector.html("");
	
	//Add Event list items
	$.map(eventsList, function(item){
		var eventListTmpl = $("#eventListItemTemplate").tmpl(item);
		
		setDomStorage(eventListTmpl, EVENT_ITEM, item);
		eventListTmpl.appendTo(eventSelector);
	});
};


function initEventPagination(){
	var pageItem = {page1 : 1, page2 : 2, page3 : 3, page4 : 4, page5 : 5, callbackprev : "onClickPrevListener", callbackpage1 : "onClickPage1Listener", callbackpage2 : "onClickPage2Listener", callbackpage3 : "onClickPage3Listener", callbackpage4 : "onClickPage4Listener", callbackpage5 : "onClickPage5Listener", callbacknext : "onClickNextListener"};
	
	$("#eventPagination").html("");
	var paginationTmpl = $("#eventPaginationTemplate").tmpl(pageItem);
	paginationTmpl.appendTo($("#eventPagination"));
	
	//Store Current Page
	setEeventCurrentPage($("#1"));
}


function setEeventCurrentPage(selector){
	var pageNo = $(selector).attr("id");
	setDomStorage($("#eventPagination"), EVENT_PAGE_ITEM, pageNo);
}


function getEventCurrentPage(){
	var currentPage = getDomStorage($("#eventPagination"), EVENT_PAGE_ITEM);
	
	if(currentPage == undefined){
		return 1;
	}
	
	return currentPage;
}


function setPageSelected(selector){
	$("#eventPagination ul li").removeClass("active");
	$(selector).addClass("active");
}


function onClickPrevListener(selector){
	var currentPage = getEventCurrentPage();
	
	//Get second page
	var secondPage = $("#eventPagination ul li:nth(2)").attr("id");
	if(currentPage >= secondPage){
		currentPage = currentPage - 1;
	}
	
	//Selected page item if has current page
	setPageSelected($("#" + currentPage));
	
	
}


function onClickNextListener(selector){
	var currentPage = getEventCurrentPage();
	
	currentPage++;
	
	//Selected page item if has current page
	setPageSelected($("#" + currentPage));
	
	
}


function onClickPage1Listener(selector){
	//Set Page Selected
	setPageSelected(selector);
	
	//Store Current Page
	setEeventCurrentPage(selector);
	
	
}


function onClickPage2Listener(selector){
	//Set Page Selected
	setPageSelected(selector);
	
	//Store Current Page
	setEeventCurrentPage(selector);
	
	
}


function onClickPage3Listener(selector){
	//Set Page Selected
	setPageSelected(selector);
	
	//Store Current Page
	setEeventCurrentPage(selector);
	
	
}


function onClickPage4Listener(selector){
	//Set Page Selected
	setPageSelected(selector);
	
	//Store Current Page
	setEeventCurrentPage(selector);
	
	
}


function onClickPage5Listener(selector){
	//Set Page Selected
	setPageSelected(selector);
	
	//Store Current Page
	setEeventCurrentPage(selector);
	
	
}


/**
 * 
 * @param selector
 */
function onClickEventItemListener(selector){
	
	//Get Event Item from DOM
	var event = getDomStorage($(selector), EVENT_ITEM);
	
	//Store Data in DOM
	setDomStorage(HOME_CONTAINER_SELECTOR, EVENT_ITEM, event);
	setDomStorage(HOME_CONTAINER_SELECTOR, "selectedEventElement", $(selector));
	
	//Open detail event Page
	loadPage(HOME_CONTAINER_SELECTOR, EVENT_MENU_PAGE,function(){
		//loadPage($(".tab-content"), EVENT_DETAIL_PAGE);
	});
}


/**
 * Search event based on keyword
 * @param button
 */
function onClickSearchEvent(button){
	// not implement
}


function onClickOpenCreateEvent(button){
	//Clear old data
	clearControls($("#createNewEventDialog input"));
	
	//Remove event item from DOM
	removeDomStorage(HOME_CONTAINER_SELECTOR, EVENT_ITEM);
	
	//Open detail event Page
	loadPage(HOME_CONTAINER_SELECTOR, EVENT_MENU_PAGE,function(){
		loadPage($(".tab-content"), EVENT_DETAIL_PAGE,function(){
			$(".event-detail-title").text("CREATE EVENT");
			$("#eventDetail>a").text("Create Event");
		});
	});
}