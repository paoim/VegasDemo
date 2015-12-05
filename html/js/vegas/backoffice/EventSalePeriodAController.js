

function EventSalePeriodAController(){}


EventSalePeriodAController.prototype = new EventMenuController();


EventSalePeriodAController.prototype.init = function(){
	
	initSalePeriodUpcomingItems();
	
	initSalePeriodTimeItems();
	
	initSalePeriodTicketTypeItems();
	
	//Click on Sale Period button
	setOnClickListener($("#salePeriod"), onClickAddSalePeriod);
	
	//Click on View upcoming sale periods
	setOnClickListener($("#salePeriod_upcomingSalePeriod"), onClickViewUpcomingSalePeriod);
	
	//Click on Event Time button
	setOnClickListener($("#salePeriodEventTime"), onClickSalePeriodEventTime);
	
	//Click on Ticket Type button
	setOnClickListener($("#salePeriodTicketType"), onClickSalePeriodTicketType);
	
	//Click on Delete button
	setOnClickListener($("#salePeriodResidentDelete"), onClickSalePeriodResidentDelete);
	
	//Click on Cancel button
	setOnClickListener($("#salePeriodResidentCancel"), onClickSalePeriodResidentCancel);
	
	//Click on Save & Publish button
	setOnClickListener($("#salePeriodResidentSavePublish"), onClickSalePeriodResidentSavePublish);
	
	updateEventTabContainer();
};


function onClickAddSalePeriod(button){
	
}


function onClickViewUpcomingSalePeriod(button){
	var upcomingSelector = $("#salePeriod_upcomingSalePeriodList");
	button.html("View upcoming sale periods");
	
	if(upcomingSelector.is(":visible")){
		switchCssClass(button, "upcoming-sale-periods", "view-upcoming-sale-periods");
		upcomingSelector.hide();
	}
	else{
		switchCssClass(button, "view-upcoming-sale-periods", "upcoming-sale-periods");
		button.html("Upcoming sale periods");
		upcomingSelector.show();
	}
	
	updateEventTabContainer();
}


function initSalePeriodUpcomingItems(){
	var salePeriodUpcomingSelector = $("#salePeriod_upcomingSalePeriodList");
	var salePeriodUpcoming = [
	                    {id : 1, startDate : "Jun 01, 2013", endDate : "Jun 30, 2013", callback : "onClickUpcomingGoto"},
	                    {id : 2, startDate : "Jul 01, 2013", endDate : "Dec 31, 2013", callback : "onClickUpcomingGoto"},
	                    {id : 3, startDate : "Sep 01, 2013", endDate : "Sep 07, 2013", callback : "onClickUpcomingGoto"}
	                   ];
	
	//Clear old Sale Period Time items
	salePeriodUpcomingSelector.html("");
	
	//add new Sale Period Time items
	$.map(salePeriodUpcoming, function(item){
		var salePeriodUpcomingTmpl = $("#salePeriodUpcomingItemTemplate").tmpl(item);
		
		setDomStorage(salePeriodUpcomingTmpl, "salePeriodUpcomingItem", item);
		salePeriodUpcomingTmpl.appendTo(salePeriodUpcomingSelector);
	});
}


function onClickUpcomingGoto(selector){
	alert('Go to...');
}


function initSalePeriodTimeItems(){
	var salePeriodTimeSelector = $("#salePeriod_timesItem");
	var salePeriodTimes = [
	                    {id : 1, eventBegin : "07:00 pm.", doorOpen : "06:00 pm.", endSellingTime : "06:00 pm.", callback : "onClickSalePeriodRemoveEventTime"},
	                    {id : 2, eventBegin : "09:00 pm.", doorOpen : "08:00 pm.", endSellingTime : "08:00 pm.", callback : "onClickSalePeriodRemoveEventTime"}
	                   ];
	
	//Clear old Sale Period Time items
	salePeriodTimeSelector.html("");
	
	//add new Sale Period Time items
	addNewEventTimeItem(salePeriodTimes, salePeriodTimeSelector);
}


function onClickSalePeriodEventTime(button){
	var salePeriodTimes = [
	                       {id : 1, eventBegin : "07:00 pm.", doorOpen : "06:00 pm.", endSellingTime : "06:00 pm.", callback : "onClickSalePeriodRemoveEventTime"}
	                      ];
	
	//add new Sale Period Time items
	addNewEventTimeItem(salePeriodTimes, $("#salePeriod_timesItem"));
}


function initSalePeriodTicketTypeItems(){
	var salePeriodTicketSelector = $("#salePeriod_ticketTypeItem");
	var salePeriodTickets = [
	                    {id : 1, ticketTypeValue : "1", ticketTypeLabel : "Splash Zone Rows A & B, $214.50", callback : "onClickSalePeriodRemoveTicketType"},
	                    {id : 2, ticketTypeValue : "-", ticketTypeLabel : "Select ticket type", callback : "onClickSalePeriodRemoveTicketType"}
	                   ];
	
	//Clear old Sale Period Ticket Type items
	salePeriodTicketSelector.html("");
	
	//add new Sale Period Ticket Type items
	addNewTicketTypeItem(salePeriodTickets, salePeriodTicketSelector);
}


function onClickSalePeriodTicketType(button){
	var salePeriodTickets = [
	                         {id : 1, ticketTypeValue : "-", ticketTypeLabel : "Select ticket type", callback : "onClickSalePeriodRemoveTicketType"}
	                        ];
	
	//add new Sale Period Ticket Type items
	addNewTicketTypeItem(salePeriodTickets, $("#salePeriod_ticketTypeItem"));
}


function onClickSalePeriodResidentDelete(button){
	
}


function onClickSalePeriodResidentCancel(button){
	
}


function onClickSalePeriodResidentSavePublish(button){
	
}