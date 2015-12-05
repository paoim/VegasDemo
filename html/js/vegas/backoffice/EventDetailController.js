

function EventDetailController(){}


EventDetailController.prototype = new EventMenuController();


var gMapsLatLonPicker = null;


EventDetailController.prototype.init = function(){
	
	//Populate Event Detail
	this.populateEventDetail();
	
	//Init Event Category Dropdown
	initEventCategory();
	
	//Change on Category Drop down
	setOnChangeListener($("#event_category"), onChangeEventCategory);
	
	//Upload & Preview Horizontal Image
	$("#uploadImageHorizontal").gaeImageUploader({
		isImageUpload: true,
		callbackCsvPath: "",
		loadingClass: "loading.image",
		endInputSelector: "imageHorizontalUrl",
		onSuccess: completeHorizontalImage,
		blobUrl: this.eventService.baseBackendUrl + "blob/v10",
		saveButton: $("#savePublishEvent")
	});
	
	//Upload & Preview Vertical Image
	$("#uploadImageVertical").gaeImageUploader({
		isImageUpload: true,
		callbackCsvPath: "",
		loadingClass: "loading.image",
		endInputSelector: "imageVerticalUrl",
		onSuccess: completeVerticalImage,
		blobUrl: this.eventService.baseBackendUrl + "blob/v10",
		saveButton: $("#savePublishEvent")
	});
	
	//Upload & Preview Square Image
	
	
	//Upload & Preview Big Image
	
	// Hide upload image button 
	$("#uploadImageHorizontalButton").hide();
	$("#uploadImageVerticalButton").hide();
	
	//Click on Preview Image
	setOnButtonClickListener($("#event_imageHorizontalUrl"), function(){$("#uploadImageHorizontal").trigger("click");});
	setOnButtonClickListener($("#event_imageVerticalUrl"), function(){$("#uploadImageVertical").trigger("click");});
	
	//Click on Edit Venue button
	//setOnClickListener($("#editVenue"), onClickEditVenue);
	
	//Click on View full venue details
	setOnClickListener($("#event_venue_detail"), onClickViewVenueDeatil);
	
	//Click on Select another Venue button
	setOnClickListener($("#anotherVenue"), onClickSelectAnotherVenue);
	
	//Click on save Publish Event button
	setOnClickListener($("#savePublishEvent"), onClickSavePublishEvent);
	
	//Click on Discard Changes Event button
	setOnClickListener($("#discardChangeEvent"), onClickDiscardChangeEvent);
	
	//Click on Create New Venue button
	//setOnClickListener($("#createNewVenue"), onClickCreateNewVenueDialog);
	
	//Render AZ listener
	setListItemListener($("#pagingAzContainer ul li"), onClickAzSearchListener);
	
	// select A as default
	$("#pagingAzContainer ul li:nth(1)").trigger("click");
	
	//Set focus for first field
	$("#eventDetailContainer input[type='text']:first").focus();
	
	updateEventTabContainer();
};


function completeHorizontalImage(response){
	
	previewImage(response, $("#previewImageHorizontal"), $("#imageHorizontalUrl"));
}


function completeVerticalImage(response){
	
	previewImage(response, $("#previewImageVertical"), $("#imageVerticalUrl"));
}


function initEventCategory(){
//	//Get all categories and fetch them into single drop down
//	var requestData = {};
//	apiRequester.getCategoryPage(requestData, function(category){
//		var categories = [{value : "-", text : "Select event category"}];
//		
//		$.map(category.items, function(item){
//			var category = {value : item.id, text : item.name}
//			categories.push(category);
//		});
//		
//		//Set value & text to single drop down
//		setFullSingleDropdown($("#event_category"), categories);
//		
//	}, failureHandler);
//	
//	//Remove all options from subCategories Drop down
//	clearSingleDropdown($("#event_subCategoryId"));
}


function onChangeEventCategory(button){
	var singleSelector = $("#event_subCategoryId");
	
	if(button.val() == "-"){
		//Remove all options from subCategories Drop down
		clearSingleDropdown(singleSelector);
		return false;
	}
	
	//Get all sub-categories by main categories ID and fetch them into single drop down
//	var requestData = {pathVariable : button.val()};
//	apiRequester.getSubCategoryByMainCategoryId(requestData, function(items){
//		var subCategories = [{value : "-", text : "Select type of " + $("#event_category option:selected").text()}];
//		
//		$.map(items, function(item){
//			var subCategory = {value : item.id, text : item.name};
//			subCategories.push(subCategory)
//		});
//		
//		//Set value & text to single drop down
//		setFullSingleDropdown(singleSelector, subCategories);
//		
//	}, failureHandler);
}


function onClickViewVenueDeatil(button){
	$(".gllpLatlonPicker").each(function() {
		if($("#gllpMap").children().length <= 0){
			gMapsLatLonPicker = new GMapsLatLonPicker();
			gMapsLatLonPicker.init( $(this) );
		}
	});
	
	var venueId = $("#event_venueId").val();
	venueId = (venueId != "" && venueId != undefined) ? venueId : 1;
	
//	var requestData = {pathVariable : venueId};
//	apiRequester.getVenue(requestData, function(venue){
//		
//		$("#venue_logoUrl").attr('src', venue["logoUrl"]);
//		$("#venue_imageUrls").attr('src', venue["imageUrls"]);
//		
//		$("#viewVenueDetailsDialog #popupContent span, #viewVenueDetailsDialog #popupContent input[type !='file'], #viewVenueDetailsDialog #popupBottom span").each(function(){
//			var selectorId = $(this).attr("id");
//			if(selectorId != undefined){
//				var key = selectorId.substring("venue_".length);
//				var value = venue[key];
//				
//				//console.log(key + ' : ' + value);
//				$(this).html(value);
//			}
//		});
//		
//		$("#viewVenueDetailsDialog").modal('show');
//		
//	}, failureHandler);
}


function onClickSelectAnotherVenue(button){
	initVenueListItems($("#venueDialogList"), $("#selectVenueListTemplate"), "onClickVenueDialogItemListener");
	
	//$("#selectAnotherVenueDialog").modal('show');
}


function onClickVenueDialogItemListener(selector){
	//Close Select Another Popup
	closeSelectVenuePopup();
	
	//Get Venue Item from DOM
	var venueItem = getDomStorage($(selector), VENUE_ITEM);
	//console.log(venueItem);
	
	//Update Venue Data in Event Detail Page
	updateVenueDisplay(venueItem);
	$("#event_venueId").val(venueItem.id);
	$("#event_eventVenue").val(venueItem);
}


function closeSelectVenuePopup(button){
	
	$("#selectAnotherVenueDialog").modal('hide');
}


function onClickEditVenue(button){
	var venueId = $("#event_venueId").val();
	venueId = (venueId != "" && venueId != undefined) ? venueId : 1;
	var venueItem = {id : venueId};
	
	//Set venue item to DOM
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM, venueItem);
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_FLAG, LINK_TO_EDIT_VENUE_EVENT);
	
	//Open Venue Page
	openVenueDetailPage();
}


function onClickCreateNewVenueDialog(button){
	//Close Popup
	closeSelectVenuePopup();
	
	//Clear data from DOM
	removeDomStorage(HOME_CONTAINER_SELECTOR, VENUE_ITEM);
	setDomStorage(HOME_CONTAINER_SELECTOR, VENUE_FLAG, LINK_TO_CREAVE_NEW_VENUE_EVENT);
	
	//Open Venue Page
	openVenueDetailPage();
}


EventDetailController.prototype.populateEventDetail = function(){
	//Get Event Item from DOM
	var event = getDomStorage(HOME_CONTAINER_SELECTOR, EVENT_ITEM);
	
	//Get Event Detail
	//this.eventService.get(event.id, function(event){
	if(event){
		$("#eventDetailContainer input[type !='file'], #eventDetailContainer select, #eventDetailContainer textarea").each(function(){
			var ele = $(this);
			var key = ele.attr("id");
			var item = event[key];
			
			setDomStorage($("#eventDetailContainer"), "event", event);
			
			//console.log(key + ' : ' + item);
			ele.val(item);
			
			if(key == "eventVenue" && item){
				updateVenueDisplay(item);
			}
			
			if(ele.attr("type") === "checkbox"){
				ele.attr("checked", item);
			}
			
			//Preview Image
			if("imageHorizontalUrl" == key && item){
				previewImage(item, $("#previewImageHorizontal"), $("#imageHorizontalUrl"));
			}
			if("imageVerticalUrl" == key && item){
				previewImage(item, $("#previewImageVertical"), $("#imageVerticalUrl"));
			}
			
		});
		
		updateEventTabContainer();
	}
		
	//}, failureHandler);
	
};


function updateVenueDisplay(venue){
	$("#event_venue .item-left span").each(function(){
		var key = $(this).attr("id").substring("venue_".length);
		var value = venue[key];
		
		//console.log(key + ' : ' + value);
		$(this).html(value);
	});
}


function onClickSavePublishEvent(button){
	var requestData = generateRequestData("#eventDetailContainer input[type !='file'], #eventDetailContainer select, #eventDetailContainer textarea");
	var event = getDomStorage($("#eventDetailContainer"), "event");
	
	if(event && event.id){
		requestData.id = event.id;
		updateEvent(button, requestData);
	}
	else{
		createEvent(button, requestData);
	}
}


function updateEvent(button, requestData){
	
}

function createEvent(button, requestData){
	
}


function onClickDiscardChangeEvent(button){
	
}