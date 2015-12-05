//console.log("base.listener");



/**
 * Set touch start listener event
 * @param selector
 * @param handler
 */
function setOnTouchStartListener(selector,handler){
	$(document).on('touchstart',selector,function(){
		event.preventDefault();
		//call later
		handler(selector);
	});
}


/**
 * Set listener event to specific html list
 * 
 * @param button
 * @param handler
 */
function setOnClickListener(selector,handler){

	//$(document).on("click", "a.foo", fn).
//	$(document).on("click", selector, function() {
//		//call later
//		handler(selector);
//	});
	$(selector).click(function(){
		handler(selector);
	});
}

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
function setDelegateClickListener(selector, handler){
	$('body').delegate(selector, "click", handler);  
}


/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
function setDelegateChangeListener(selector, handler){
	$('body').delegate(selector, "change", handler);  
}


/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
function setDelegateBlurListener(selector, handler){
	$('body').delegate(selector, "blur", handler);
}


/**
 * Choose image file, submit it and display it 
 */
function setDelegateSubmitListener(selector, handler){
	$("body").delegate(selector, "submit", {json: true}, handler);
}


/**
 * Set listener event to Post Form Callback
 * 
 * @param iFrame Post Form
 * @param handler
 */
function setFormCallbackListener(selectorString,handler){
	//console.log("setOnCallbackListener");
	$(selectorString).iframePostForm({
		json : true,
		complete : function (data){
			// do something here
			//console.log("compete...");
			handler(data, $(selectorString));
		}
	});
}


/**
 * Remove all selection of element containing in parent element
 * 
 * @param parentEle
 */
function removeSelectedItem(parentEle){
	parentEle.each(function(){
		$(this).removeClass("active");
	});
}


/**
 *  set selection of item
 *  
 * @param item
 */
function setSelectedItem(parentEle,item){
	removeSelectedItem(parentEle);
	item.each(function(){
		$(this).addClass("active");
	});
}


/**
 * Set listener event to specific html list
 * 
 * @param listId
 * @param eventHandler
 */
function setSpecificListItemListener(listId, eventHandler){
	$("#" + listId + " li:not(:first)").click(function(){
		$("#" + listId + " li").removeClass("active");
		$(this).addClass("active");
		eventHandler($(this),listId);
	});
}


/**
 * Set listener event to specific html table on row click
 *  
 * @param tableId
 * @param eventHandler
 */
function setTableRowListener(tableId, eventHandler){
	$("#" + tableId + " tbody tr").click(function(){
		$("#" + tableId + " tbody td").removeClass("active");
		$(this).children().each(function(){
			$(this).addClass("active");
		});
		eventHandler($(this),tableId);
	});
}


/**
 * Set Selector's action listener where:
 * 1. selector is an html element object
 * 2. eventHandler is a method to act a click event
 * @param selector
 * @param eventHandler
 */
function setListItemListener(selector, eventHandler){
	selector.click(function(){
		selector.removeClass("active");
		$(this).addClass("active");
		eventHandler($(this),selector);
	});
}


function setPagingItemListener(selector, eventHandler){
	selector.click(function(){
		var isLast = $(this).is(":last-child");
		var isFirst = $(this).is(":first-child");
		var hasClass = $(this).hasClass("disabled");
		
		if(!hasClass){
			selector.removeClass("active");
			if(!isFirst && !isLast){
				$(this).addClass("active");
			}
			
			eventHandler($(this),selector);
		}
	});
}


/**
 * Set listener event to specific html list
 * 
 * @param button
 * @param handler
 */
function setOnButtonClickListener(button,handler){
	button.click(function(){
		handler(button);
	});
}


/**
 * Set On change action listener
 * @param selector
 * @param eventHandler
 */
function setOnChangeListener(selector, eventHandler){
	selector.change(function(){
		eventHandler($(this));
	});
}


/**
 * Set On Focus action listener
 * @param selector
 * @param eventHandler
 */
function setOnFocusListener(selector, eventHandler){
	selector.focus(function(){
		eventHandler($(this),selector);
	});
}


/**
 * Set Item's fields Keyup listener where:
 * 1. selector is an html element object
 * 2. eventHandler is a method to act a change event
 * @param selector
 * @param eventHandler
 */
function setKeyUpItemListener(selector, eventHandler){
	selector.keyup(function(){
		selector.removeClass("active");
		$(this).addClass("active");
		eventHandler($(this),selector);
	});
}


function setOnKeyupListener(selector, eventHandler){
	selector.keyup(function(){
		eventHandler($(this),selector);
	});
}


function setOnFocusoutListener(selector, eventHandler){
	selector.focusout(function(){
		eventHandler($(this),selector);
	});
}


function setOnEnterKeyListener(selector, handler){
	selector.keyup(function(e){
		//Invoke event when it is enter key
		if(isEnterKey(e)) {
			handler(selector);
		}
	});
}


function isEnterKey(e){
	return ((e.keyCode ? e.keyCode : e.which) == 13);
}


function setTriggerListener(selector, keyStr){
	$(selector).trigger(keyStr);
}


/**
 * Make all items can be un-clicked
 * @param parentEle
 */
function disableClickedItems(parentEle){
	parentEle.each(function(){
		$(this).off("click");
	});
}


/**
 * Off click button - disable click button
 * @param button
 */
function offClickButtonAction(button){
	button.off("click");
}


/**
 * On click button - enable click button
 * @param button
 * @param handleClick
 */
function onClickButtonAction(button, handleClick){
	button.on("click", handleClick);
}


/**
 * Disable change on question's fields
 * @param selector
 */
function disableChangeQuestionFields(selector){
	selector.off("change");
}


/**
 * Remove onLostFocus listener from selector element
 * 
 * @param selector
 */
function offOnLostFocusListener(selector){
	selector.off("focusout");
}


/**
 * Assign all items to single drop down
 * @param selector
 * @param items
 */
function setSingleDropdown(selector, items){
	//Remove all options except first option
	clearSingleDropdown(selector, "not(:first)");
	
	//Create new options
	$.map(items, function(item, index){
		selector.append($("<option></option>").text(item));
	});
}


/**
 * Assign all items to single drop down with value & text
 * @param selector
 * @param listObjects
 */
function setFullSingleDropdown(selector, listObjects, itemSelected){
	//Remove all options
	clearSingleDropdown(selector);
	
	//Create new options
	$.map(listObjects, function(item, index){
		selector.append($("<option></option>").val(item.id).text(item.name));
	});
	
	//Set item selected
	if(itemSelected != undefined && itemSelected.length > 0){
		selector.val(itemSelected);
	}
}


/**
 * Remove all single drop down items
 * @param selector
 * @param filter
 */
function clearSingleDropdown(selector, filter){
	var option = "option";
	option = (filter != undefined ? ("option:" + filter) : option);
	
	selector.find(option).remove().end();
}


/**
 * 
 * @param disableControlContainer
 */
function disableControls(controlsSelector){
	controlsSelector.each(function(){
		$(this).attr("disabled",true);
		if($(this).is("button") || $(this).attr("type") == "button"){
			$(this).addClass("disable-button");
		}
		else{
			$(this).addClass("disable-input");
		}
	});
}


/**
 * 
 * @param endableControlContainer
 */
function enableControls(controlsSelector){
	controlsSelector.each(function(){
		$(this).removeAttr("disabled");
		if($(this).is("button") || $(this).attr("type") == "button"){
			$(this).removeClass("disable-button");
		}
		else{
			$(this).removeClass("disable-input");
		}
	});
}


/**
 *  Clear all control in the container
 *  
 * @param controlContainer
 */
function clearControls(controlContainer){
	controlContainer.each(function(){
		$(this).val("");
		
		if($(this).is(":checked")){
			if($(this).attr("type") == "checkbox"){
				$(this).attr("checked", false);
			}
			
			if($(this).attr("type") == "radio"){
				$(this).attr("checked", false);
			}
		}
	});
}


/**
 * Disable action of control depending on active flag
 *  
 * @param selector
 * @param active
 */
function setActionControls(selector,active){
	if(!active){
		selector.attr("disabled",true);
	}
	else{
		selector.removeAttr("disabled");
	}
}