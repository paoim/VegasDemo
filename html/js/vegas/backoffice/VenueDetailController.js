/** 210 Create New/View/Edit Venue **/


function VenueDetailController(){}


VenueDetailController.prototype = new VenueController();


VenueDetailController.prototype.init = function(){
	
	//Upload & Preview LOGO
	$("#uploadLogo").gaeImageUploader({
		isImageUpload: true,
		callbackCsvPath: "",
		loadingClass: "loading.image",
		endInputSelector: "logoUrl",
		onSuccess: completeUploadLogo,
		blobUrl: this.venueService.baseBackendUrl + "blob/v10",
		saveButton: $("#venueSavePublish")
	});
	
	//Upload & Preview Photo
	$("#uploadPhoto").gaeImageUploader({
		isImageUpload: true,
		callbackCsvPath: "",
		loadingClass: "loading.image",
		endInputSelector: "photoUrl",
		onSuccess: completeUploadPhoto,
		blobUrl: this.venueService.baseBackendUrl + "blob/v10",
		saveButton: $("#venueSavePublish")
	});
	
	// Hide upload image button 
	$("#uploadLogoButton").hide();
	$("#uploadPhotoButton").hide();
	
	//Click on Preview Image
	setOnButtonClickListener($("#venue_logo"), function(){$("#uploadLogo").trigger("click");});
	setOnButtonClickListener($("#venue_photo"), function(){$("#uploadPhoto").trigger("click");});
	
	//Click on Cancel button
	setOnClickListener($("#venueCancel"), onClickVenueCancel);
	
	//Click on Save & Publish button
	setOnClickListener($("#venueSavePublish"), onClickVenueSavePublish);
	
	viewVenueDetail();
	
	//Set focus for first field
	$("#boxContainer input:first").focus();
};


function completeUploadLogo(response){
	
	previewImage(response, $("#previewLogo"), $("#logoUrl"));
}


function completeUploadPhoto(response){
	
	previewImage(response, $("#previewPhoto"), $("#photoUrl"));
}


function viewVenueDetail(){
	var venueItem = getDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM);
	if(venueItem != undefined){
		//View Old Data
//		var requestData = {pathVariable : venueItem.id};
//		apiRequester.getVenue(requestData, function(venue){
//			//console.log(venue);
//			
//			$("#boxContainer input[type !='file'], #boxContainer textarea").each(function(){
//				var key = $(this).attr("id").substring("venue_".length);
//				var value = venue[key];
//				
//				$(this).val(value);
//			});
//			
//		}, failureHandler);
	}
	else{
		//Clear old data before create New Data
		clearControls($("#boxContainer input, #boxContainer textarea"));
	}
}


function onClickVenueCancel(button){
	var venueFlag = getDomStorage(HOME_CONTAINER_SELECTOR, VENUE_FLAG);
	
	if(venueFlag == LINK_TO_CREAVE_NEW_VENUE_VENUE){
		
		//Go to Venue List Page
		$("#menu li:nth(1)").trigger("click");
	}
	else if(venueFlag == LINK_TO_EDIT_VENUE_VENUE){
		
		//Keep the same page
		//clearControls($("#boxContainer input, #boxContainer textarea"));
		
		//viewVenueDetail();
		//$("#boxContainer input:first").focus();
		
		//Go to Venue List Page
		$("#menu li:nth(1)").trigger("click");
	}
	else if(venueFlag == LINK_TO_CREAVE_NEW_VENUE_EVENT){
		//Go to Event Detail Show Select Another Venue Popup
		goToOpenSelectAnotherVenuePopup();
	}
	else if(venueFlag == LINK_TO_EDIT_VENUE_EVENT){
		//Go to Event Detail Page
		goToEventDetailPage();
	}
}


function goToEventDetailPage(){
	$(MENU_FIRST_SELECTOR).trigger("click");//Go to "Event List" Page by select on first tab (Event)
	
	var selectedEventElement = getDomStorage(HOME_CONTAINER_SELECTOR, "selectedEventElement");//Get Selected Element from DOM
	
	selectedEventElement.trigger("click");//Go to "Event Detail" Page by select on selected event item from "Event List" Page
}


function goToOpenSelectAnotherVenuePopup(){
	goToEventDetailPage();//Go to Event Detail Page
	
	onClickSelectAnotherVenue();//Open Select Another Venue Popup
}


function onClickVenueSavePublish(button){
	var requestData = generateRequestData("#boxContainer input[type !='file'], #boxContainer textarea","event_");
	
	var venueItem = getDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM);
	if(venueItem != undefined){
		
		requestData.id = venueItem.id;
		updateVenue(button, requestData);
	}
	else{
		
		createVenue(button, requestData);
	}
	
}


function createVenue(button, requestData){
//	apiRequester.createVenue(requestData, function(venue){
//		alert("This venue was saved successfully!");
//		onClickVenueCancel(button);
//	}, failureHandler);
}


function updateVenue(button, requestData){
//	apiRequester.updateVenue(requestData, function(venue){
//		alert("This venue was updated successfully!");
//		onClickVenueCancel(button);
//	}, failureHandler);
}