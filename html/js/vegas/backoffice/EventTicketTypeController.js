

function EventTicketTypeController(){}


EventTicketTypeController.prototype = new EventMenuController();


EventTicketTypeController.prototype.init = function(){
	
	//Upload & Preview Image
	$("#uploadImageSeatingMap").gaeImageUploader({
		isImageUpload: true,
		callbackCsvPath: "",
		loadingClass: "loading.image",
		endInputSelector: "imageSeatingMapUrl",
		onSuccess: completeUploadImageSeatingMap,
		blobUrl: this.eventService.baseBackendUrl + "blob/v10",
		saveButton: $("#createNewTicketType")
	});
	
	// Hide upload image button 
	$("#uploadImageSeatingMapButton").hide();
	
	//Click on Preview Image
	setOnButtonClickListener($("#seatingMap"), function(){$("#uploadImageSeatingMap").trigger("click");});
	
	//Init ticket types list
	initTicketTypeList();
	
	//Click on Create New Ticket Type button
	setOnClickListener($("#createNewTicketType"), onClickCreateNewTicketType);
	
	//Click on Ticket Cancel button
	setOnClickListener($("#createEditTicketCancel"), onClickTicketCancel);
	
	//Click on Ticket Save & Publish button
	setOnClickListener($("#createEditTicketSavePublish"), onClickTicketSavePublish);
	
	//Click on Create New Deal button
	setOnClickListener($("#createNewDeal"), onClickCreateNewDeal);
	
	//Click on Deal Cancel button
	setOnClickListener($("#createEditDealCancel"), onClickDealCancel);
	
	//Click on Deal Save & Publish button
	setOnClickListener($("#createEditDealSavePublish"), onClickDealSavePublish);
	
	updateEventTabContainer();
};


function completeUploadImageSeatingMap(response){
	
	previewImage(response, $("#imageSeatingMap"), $("#imageSeatingMapUrl"));
}


function initTicketTypeList(){
	var ticketTypeItemSelector = $("#ticketTypeListItems");
	var ticketTypeItems = [
	                    {id : 1, price : "$214.50", type : "VIP Indulegence Package Row L", description : "This VIP Indulgence Package in the...", callbackcopy : "onClickDuplicateTicket", callbackedit : "onClickEditTicketLabel", callback : "onClickDeleteTicket"},
	                    {id : 2, price : "$141.90", type : "Premium Seating Rows C - K", description : "", callbackcopy : "onClickDuplicateTicket", callbackedit : "onClickEditTicketLabel", callback : "onClickDeleteTicket"},
	                    {id : 3, price : "$123.75", type : "Splash Zone Rows A & B", description : "", callbackcopy : "onClickDuplicateTicket", callbackedit : "onClickEditTicketLabel", callback : "onClickDeleteTicket"},
	                    {id : 4, price : "$135.40", type : "Splash Zone Super Deal", description : "", callbackcopy : "onClickDuplicateTicket", callbackedit : "onClickEditTicketLabel", callback : "onClickDeleteTicket"},
	                    {id : 5, price : "$123.75", type : "Premium Seating Update", description : "", callbackcopy : "onClickDuplicateTicket", callbackedit : "onClickEditTicketLabel", callback : "onClickDeleteTicket"}
	                   ];
	
	//Clear old Ticket Types items
	ticketTypeItemSelector.html("");
	
	//add new Ticket Types items
	$.map(ticketTypeItems, function(item){
		var ticketTypeTmpl = $("#ticketTypesItemTemplate").tmpl(item);
		
		setDomStorage(ticketTypeTmpl, "ticketTypeItem", item);
		ticketTypeTmpl.appendTo(ticketTypeItemSelector);
	});
}


function onClickCreateNewTicketType(button){
	
	$("#createEditTicketDialog").modal('show');
}


function closeCreateEditTicketPopup(button){
	
	$("#createEditTicketDialog").modal('hide');
}


function onClickTicketCancel(button){
	
	closeCreateEditTicketPopup(button);
}


function onClickTicketSavePublish(button){
	
}


function onClickCreateNewDeal(button){
	
	$("#createEditDealDialog").modal('show');
}


function closeCreateEditDealPopup(button){
	
	$("#createEditDealDialog").modal('hide');
}


function onClickDealCancel(button){
	
	closeCreateEditDealPopup(button);
}


function onClickDealSavePublish(button){
	
}


function onClickDuplicateTicket(selector){
	var currentParent = $(selector).parents('.ticket-type-items-content');
	
	//console.log('Copy Ticket...');
	//console.log($(currentParent).attr('id'));
	
	var copyTicket = $(currentParent).clone();
	
	$(currentParent).after($(copyTicket));//$(‘selector’).after(‘new content’);
	//$(copyTicket).insertAfter($(currentParent));//$(‘new content’).insertAfter(‘selector’);
}


function onClickEditTicketLabel(selector){
	var currentParent = $(selector).parents('.ticket-type-items-content');
	
	console.log('Edit Ticket...');
	console.log($(currentParent).attr('id'));
	
	//$(selector).removeAttr('readonly');
	
}


function onClickDeleteTicket(selector){
	if(!confirm("Are you sure you want to delete this ticket?")){
		return false;
	}
	
	var currentParent = $(selector).parents('.ticket-type-items-content');
	
	//console.log('Delete Ticket...');
	//console.log($(currentParent).attr('id'));
	
	$(currentParent).remove();
}