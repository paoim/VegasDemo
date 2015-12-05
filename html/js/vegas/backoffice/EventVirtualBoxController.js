

function EventVirtualBoxController(){}


EventVirtualBoxController.prototype = new EventMenuController();


EventVirtualBoxController.prototype.init = function(){
	
	initSoldOutItem();
	
	initCancelledEventItem();
	
	//Click on Sold Out Ticket button
	setOnClickListener($("#soldOutTicket"), onClickSoldOutTicket);
	
	//Click on Cancelled Event Time button
	setOnClickListener($("#cancelEvent"), onClickCancelledEvent);
	
	//Click on savePublish button
	setOnClickListener($("#evbSavePublish"), upsertScheduleDay);
	
	//Click on cancel button
	setOnClickListener($("#evboCancel"), cancelSchedualDay);
	
	//Click on Prev Arraw
	setOnClickListener($("#movePrev"), onClickMovePrev);
	
	//Click on Next Arraw
	setOnClickListener($("#moveNext"), onClickMoveNext);
	
	updateEventTabContainer();
};


function initSoldOutItem(){
	var soldOutSelector = $("#schedul_soldOutItem");
	var soldOutItems = [
	                    {id : 1, soldTimeValue : "1", soldTimeLabel : "7:00 pm.", ticketTypesValue : "1", ticketTypesLabel : "Splash Zone Super Deal", callback : "onClickDeleteSoldOutTicket"},
	                    {id : 2, soldTimeValue : "2", soldTimeLabel : "9:00 pm.", ticketTypesValue : "2", ticketTypesLabel : "Premium Seating Rows C - K", callback : "onClickDeleteSoldOutTicket"},
	                    {id : 3, soldTimeValue : "-", soldTimeLabel : "Select time", ticketTypesValue : "-", ticketTypesLabel : "Select ticket type", callback : "onClickDeleteSoldOutTicket"}
	                   ];
	
	//Clear old sold out items
	soldOutSelector.html("");
	
	//add new sold out items
	addNewSoldOutTicket(soldOutItems, soldOutSelector);
}


function initCancelledEventItem(){
	var cancelledEventSelector = $("#schedul_canceledEventItem");
	var cancelledEventItems = [
	                    {id : 1, soldTimeValue : "1", soldTimeLabel : "7:00 pm.", callback : "onClickDeleteCancelledEvent"},
	                    {id : 2, soldTimeValue : "2", soldTimeLabel : "9:00 pm.", callback : "onClickDeleteCancelledEvent"},
	                    {id : 3, soldTimeValue : "-", soldTimeLabel : "Select time", callback : "onClickDeleteCancelledEvent"}
	                   ];
	
	//Clear old cancelled event items
	cancelledEventSelector.html("");
	
	//add new cancelled event items
	addNewCancelledEvent(cancelledEventItems, cancelledEventSelector);
}


function onClickSoldOutTicket(button){
	var soldOutItems = [
	                    {id : 1, soldTimeValue : "-", soldTimeLabel : "Select time", ticketTypesValue : "-", ticketTypesLabel : "Select ticket type", callback : "onClickDeleteSoldOutTicket"}
	                   ];
	
	//add new sold out items
	addNewSoldOutTicket(soldOutItems, $("#schedul_soldOutItem"));
}


function onClickCancelledEvent(button){
	var cancelledEventItems = [
	                    {id : 1, soldTimeValue : "-", soldTimeLabel : "Select time", callback : "onClickDeleteCancelledEvent"}
	                   ];
	
	//add new cancelled event items
	addNewCancelledEvent(cancelledEventItems, $("#schedul_canceledEventItem"));
}


function addNewSoldOutTicket(soldOutItems, soldOutSelector){
	$.map(soldOutItems, function(item){
		var soldOutTmpl = $("#soldOutItemTemplate").tmpl(item);
		
		setDomStorage(soldOutTmpl, "soldOutItem", item);
		soldOutTmpl.appendTo(soldOutSelector);
	});
}


function addNewCancelledEvent(cancelledEventItems, cancelledEventSelector){
	$.map(cancelledEventItems, function(item){
		var cancelledEventTmpl = $("#cancelledEventItemTemplate").tmpl(item);
		
		setDomStorage(cancelledEventTmpl, "cancelledEventItem", item);
		cancelledEventTmpl.appendTo(cancelledEventSelector);
	});
}


function onClickDeleteSoldOutTicket(selector){
	if(!confirm("Are you sure you want to delete this Sold Out?")){
		return false;
	}
	
	var currentParent = $(selector).parents(".soldout-line");
	
	//console.log('Click on delete...');
	//console.log($(currentParent).attr("id"));
	
	$(currentParent).remove();
}


function onClickDeleteCancelledEvent(selector){
	if(!confirm("Are you sure you want to delete this Cancelled Event?")){
		return false;
	}
	
	var currentParent = $(selector).parents(".soldout-line");
	
	//console.log('Click on delete...');
	//console.log($(currentParent).attr("id"));
	
	$(currentParent).remove();
}


function upsertScheduleDay(button){
	
}


function cancelSchedualDay(button){
	
}


function onClickMovePrev(button){
	
}


function onClickMoveNext(button){
	var getDate = $("#virtualCalendar").datepicker('getDate');
	alert(getDate);
	//$("#virtualCalendar").datepicker({minDate: '+1m'});
	//$('#virtualCalendar').datepicker('option', {minDate: ($(this).val() == 'monthly' ? '+1m' : '+0')});
	//$("#virtualCalendar").datepicker('setDate','+1m');
	$("#virtualCalendar").datepicker().datepicker('setDate','+1m');
}