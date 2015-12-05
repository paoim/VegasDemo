

function EventMenuController(){}


EventMenuController.prototype = new EventController();


EventMenuController.prototype.init = function(){
	
	//Render Events menu listener
	setListItemListener($(".tab-container-left-right ul li"), onClickEventMenuItem);
	
	// select Event Detail as default
	$(".tab-container-left-right ul li:first").trigger("click");
	
	//Get Selected Element from DOM
	//var selectedEventElement = getDomStorage(HOME_CONTAINER_SELECTOR,"selectedEventElement");
	//console.log(selectedEventElement.attr('id'));
};


function onClickEventMenuItem(selector){
	var pageName = $(selector).attr("id");
	
	loadPage($('#eventsLoadingContainer'), pageName);
}


function onClickSalePeriodRemoveEventTime(selector){
	if(!confirm("Are you sure you want to remove this event time?")){
		return false;
	}
	
	var currentParent = $(selector).parents('.sale-period-line-bottom');
	
	//console.log('Remove Event Time...');
	//console.log($(currentParent).attr('id'));
	
	$(currentParent).remove();
}


function onClickSalePeriodRemoveTicketType(selector){
	if(!confirm("Are you sure you want to remove this ticket type?")){
		return false;
	}
	
	var currentParent = $(selector).parents('.sale-period-line-bottom');
	
	//console.log('Delete Ticket Type...');
	//console.log($(currentParent).attr('id'));
	
	$(currentParent).remove();
}


function addNewEventTimeItem(salePeriodTimes, salePeriodTimeSelector){
	$.map(salePeriodTimes, function(item){
		var salePeriodTimeTmpl = $("#salePeriodTimeItemTemplate").tmpl(item);
		
		setDomStorage(salePeriodTimeTmpl, "salePeriodTimeItem", item);
		salePeriodTimeTmpl.appendTo(salePeriodTimeSelector);
	});
}


function addNewTicketTypeItem(salePeriodTickets, salePeriodTicketSelector){
	$.map(salePeriodTickets, function(item){
		var salePeriodTicketTmpl = $("#salePeriodTicketTypeItemTemplate").tmpl(item);
		
		setDomStorage(salePeriodTicketTmpl, "salePeriodTicketTypeItem", item);
		salePeriodTicketTmpl.appendTo(salePeriodTicketSelector);
	});
}


function previewImage(response, imgSelector, endImage){
	var imageUrl = "";
	if(response && response.accessUrl){
		imageUrl = response.accessUrl;
	}
	
	//If is String
	if(response && isString(response)){
		imageUrl = response;
	}
	
	endImage.val(imageUrl);
	
	//Display image
	if(imageUrl.length > 0){
		imgSelector.html("");
		imgSelector.removeClass("preview-content");
		
		var styles = {
			"position" : "absolute",
			"background-image" : "url('"+imageUrl+"')",
			"width" : "100%",
			"height" : "100%"
		};
		imgSelector.css( styles );
	}
	
}


function updateEventTabContainer(){
	var contentHeight = $(".tab-container-right").outerHeight();
	
	$(".tab-container-left").css("height", contentHeight);
}