

function EventSalePeriodBController(){}


EventSalePeriodBController.prototype = new EventMenuController();


EventSalePeriodBController.prototype.init = function(){
	
	initSalePeriodLimitedTimeItems();
	
	initSalePeriodLimitedTicketTypeItems();
	
	//Click on Event Date button
	setOnClickListener($("#salePeriodEventDate"), onClickAddEventDate);
	
	//Click on Event Time button
	setOnClickListener($("#salePeriodLimitedEventTime"), onClickSalePeriodLimitedEventTime);
	
	//Click on Ticket Type button
	setOnClickListener($("#salePeriodLimitedTicketType"), onClickSalePeriodLimitedTicketType);
	
	//Click on Delete button
	setOnClickListener($("#salePeriodLimitedDelete"), onClickSalePeriodLimitedDelete);
	
	//Click on Cancel button
	setOnClickListener($("#salePeriodLimitedCancel"), onClickSalePeriodLimitedCancel);
	
	//Click on Save & Publish button
	setOnClickListener($("#salePeriodLimitedSavePublish"), onClickSalePeriodLimitedSavePublish);
	
	updateEventTabContainer();
};


function onClickAddEventDate(button){
	
}


function initSalePeriodLimitedTimeItems(){
	var salePeriodTimeSelector = $("#salePeriodLimited_timesItem");
	var salePeriodTimes = [
	                    {id : 1, eventBegin : "07:00 pm.", doorOpen : "06:00 pm.", endSellingTime : "06:00 pm.", callback : "onClickSalePeriodRemoveEventTime"},
	                    {id : 2, eventBegin : "09:00 pm.", doorOpen : "08:00 pm.", endSellingTime : "08:00 pm.", callback : "onClickSalePeriodRemoveEventTime"}
	                   ];
	
	//Clear old Sale Period Time items
	salePeriodTimeSelector.html("");
	
	//add new Sale Period Time items
	addNewEventTimeItem(salePeriodTimes, salePeriodTimeSelector);
}


function onClickSalePeriodLimitedEventTime(button){
	var salePeriodTimes = [
	                       {id : 1, eventBegin : "07:00 pm.", doorOpen : "06:00 pm.", endSellingTime : "06:00 pm.", callback : "onClickSalePeriodRemoveEventTime"}
	                      ];
	
	//add new Sale Period Time items
	addNewEventTimeItem(salePeriodTimes, $("#salePeriodLimited_timesItem"));
}


function initSalePeriodLimitedTicketTypeItems(){
	var salePeriodTicketSelector = $("#salePeriodLimited_ticketTypeItem");
	var salePeriodTickets = [
	                    {id : 1, ticketTypeValue : "-", ticketTypeLabel : "Select ticket type", callback : "onClickSalePeriodRemoveTicketType"},
	                    {id : 2, ticketTypeValue : "1", ticketTypeLabel : "Splash Zone Rows A & B, $214.50", callback : "onClickSalePeriodRemoveTicketType"}
	                   ];
	
	//Clear old Sale Period Ticket Type items
	salePeriodTicketSelector.html("");
	
	//add new Sale Period Ticket Type items
	addNewTicketTypeItem(salePeriodTickets, salePeriodTicketSelector);
}


function onClickSalePeriodLimitedTicketType(button){
	var salePeriodTickets = [
	                         {id : 1, ticketTypeValue : "-", ticketTypeLabel : "Select ticket type", callback : "onClickSalePeriodRemoveTicketType"}
	                        ];
	
	//add new Sale Period Ticket Type items
	addNewTicketTypeItem(salePeriodTickets, $("#salePeriodLimited_ticketTypeItem"));
}


function onClickSalePeriodLimitedDelete(button){
	
}


function onClickSalePeriodLimitedCancel(button){
	
}


function onClickSalePeriodLimitedSavePublish(button){
	
}