/**
 * Adapter class to integrate view and model object, ui event binding
 * 
 */
function VenueController(){
	this.venueService = new VenueService();
}


VenueController.prototype = new HomeController();


VenueController.prototype.init = function(){
	// call to super method
	//HomeController.prototype.init.call(this); 
	
	// bind event
	//console.log("VenueController");
	
	//Click on Create New Venue button
	setOnClickListener($("#createNewVenue"), onClickCreateNewVenue);
	
	//Render AZ listener
	setListItemListener($("#pagingAzContainer ul li"), onClickAzSearchListener);
	
	initVenueListItems($("#venueListItems"), $("#venueListItemTemplate"), "onClickVenueItemListener");
	
	// select A as default
	//$("#pagingAzContainer ul li:nth(1)").trigger("click");
};


function onClickVenueItemListener(selector){
	
	//Get Venue Item from DOM
	var venueItem = getDomStorage($(selector), VENUE_ITEM);
	
	//Set venue item to DOM
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM, venueItem);
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_FLAG, LINK_TO_EDIT_VENUE_VENUE);
	
	//Open Venue Detail Page
	openVenueDetailPage();
}


function onClickCreateNewVenue(button){
	
	//Clear data from DOM
	removeDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM);
	
	//Set venue item to DOM
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_FLAG, LINK_TO_CREAVE_NEW_VENUE_VENUE);
	
	//Open Venue Detail Page
	openVenueDetailPage();
}