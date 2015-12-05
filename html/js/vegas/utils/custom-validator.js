

var CHECK_BOX					= "Please check on item";
var SINGLE_SELECT				= "Please select an item";
var INPUT_ONLY_URL				= "Please enter a valid URL";
var INPUT_ONLY_NUMBER			= "Please enter a positive number";
var MULTI_SELECT				= "Please select at least one item";
var INPUT_AT_LEAST_3CHARACTORS	= "Please input at least 3 characters";
var INPUT_ONLY_EMAIL			= "Please enter a valid email address";
var INPUT_REQUIRED				= "Please complete this mandatory field";
var INPUT_ONLY_PASSWORD			= "At least 8 characters with text & special characters";


function initValidatorBindEvents(filters){
	//Bind event to each selector
	$(filters).each(function(index){
		var id = $(this).attr("id");
		var type = $(this).attr("type");
		var required = $(this).attr("required");
		var selectRequired = $(this).data("select");// for select element
		var textareaRequired = $(this).data("textarea");// for textarea element
		var limitInputRequired = $(this).data("limitinput");// for limit input character
		
		//Only for mandatory fields
		if(required || selectRequired || textareaRequired){
			
			//Bind event for input or textarea element
			if(isValidAllTypes(type) || textareaRequired){
				$(this).bind("keyup",function(){
					var value = $(this).val();
					
					if(isValidValue(value)){
						$("#error_" + id).html("");
						
						//Keep display for input less than 3 characters
						if(limitInputRequired && getTrimStr(value).length < 3){
							$("#error_" + id).html(INPUT_AT_LEAST_3CHARACTORS);
						}
					}
					
				});
			}
			
			//Bind event for both input & select element
			$(this).bind("change",function(){
				var value = $(this).val();
				
				if(isValidValue(value)){
					$("#error_" + id).html("");
					
					//Keep display for input less than 3 characters
					if(limitInputRequired && getTrimStr(value).length < 3){
						$("#error_" + id).html(INPUT_AT_LEAST_3CHARACTORS);
					}
				}
				
				if(type === "checkbox" && $(this).is(":checked")){
					$("#error_" + id).html("");
				}
				
			});
		}
	});
}


function isValidInput(filters){
	var selectors = [];
	var isAllValids = true;
	var numRe = /^-?[0-9]*(\.[0-9]+)?$/;
	var urlRe = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i;
	var emailRe = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var pwdRe = /(?=^.{8,}$)(?=[^A-Za-z]*[A-Za-z])(?=[^!,@,#,$,%,^,&,*,?,_,~,-,(,)]*[!,@,#,$,%,^,&,*,?,_,~,-,(,)])/;
	
	
	$(filters).each(function(index){
		var isValidItem = true;
		var value = $(this).val();
		var id = $(this).attr("id");
		var type = $(this).attr("type");
		var required = $(this).attr("required");
		var multiple = $(this).attr("multiple");
		var numberRequired = $(this).data("number");// for input only number
		var selectRequired = $(this).data("select");// for select element
		var textareaRequired = $(this).data("textarea");// for textarea element
		var limitInputRequired = $(this).data("limitinput");// for limit input character
		//console.log("ID["+id+"], Type["+type+"], Required["+required+"], selectRequired["+selectRequired+"], textareaRequired["+textareaRequired+"], and Value["+value+"]");
		
		if(required || selectRequired || textareaRequired){
			var message = "";
			if(isValidValue(value)){
				isValidItem = true;
				$("#error_" + id).html("");
				
				if(isValidType(type)){
					
					if((type.isEqualString("number") && !numRe.test(value)) || (type.isEqualString("text") && numberRequired && (!numRe.test(value) || !isValidNumber(value)))){
						var selector = { index : index, selectorId : id};
						selectors.push(selector);
						
						isValidItem = false;
						message = INPUT_ONLY_NUMBER;
					}
					else if(type.isEqualString("url") && !urlRe.test(value)){
						var selector = { index : index, selectorId : id};
						selectors.push(selector);
						
						isValidItem = false;
						message = INPUT_ONLY_URL;
					}
					else if(type.isEqualString("email") && !emailRe.test(value)){
						var selector = { index : index, selectorId : id};
						selectors.push(selector);
						
						isValidItem = false;
						message = INPUT_ONLY_EMAIL;
					}
					else if(type.isEqualString("password") && !pwdRe.test(value)){
						var selector = { index : index, selectorId : id};
						selectors.push(selector);
						
						isValidItem = false;
						message = INPUT_ONLY_PASSWORD;
					}
					else if(limitInputRequired && getTrimStr(value).length < 3){
						var selector = { index : index, selectorId : id};
						selectors.push(selector);
						
						isValidItem = false;
						message = INPUT_AT_LEAST_3CHARACTORS;
					}
					
				}
				
			}
			else{
				var selector = { index : index, selectorId : id};
				selectors.push(selector);
				
				isValidItem = false;
				message = (selectRequired ? SINGLE_SELECT : INPUT_REQUIRED);
				
				if ($(this).data("message")){
					message = $(this).data("message");
				}
					
				if(type === "checkbox"){
					message = CHECK_BOX;
				}
				if(multiple){
					message = MULTI_SELECT;
				}
			}
			
			$("#error_" + id).html(message);
		}
		
		isAllValids = isAllValids && isValidItem;
		
	});
	
	//Set focus for error field
	if(!isAllValids){
		//$(filters + ":nth(" + indexs[0] + ")").focus();
		firstSelector = selectors[0];
		$("#" + firstSelector.selectorId).focus();
	}
	
	return isAllValids;
}


function clearAllErrors(filters){
	//Clear all errors
	$(filters).each(function(index){
		var id = $(this).attr("id");
		var required = $(this).attr("required");
		var selectRequired = $(this).data("select");// for select element
		var textareaRequired = $(this).data("textarea");// for textarea element
		
		//Only for mandatory fields
		if(required || selectRequired || textareaRequired){
			$("#error_" + id).html("");
			
		}
	});
}


function getTrimStr(value){
	
	return value.trimString();
}


function isValidNumber(value){
	//Is String
	if(isNaN(parseInt(value))){
		
		return false;
	}
	
	//Is Number
	return (parseInt(value) > 0);
}


function isValidValue(value){
	var isValidStr = (value != undefined && value != null && value.length > 0);
	
	if(isValidStr){
		if(($.type(value) === "string")){
			isValidStr = isNotSpace(value);
		}
		else{
			//Array of values
			$.map(value, function(item){
				isValidStr = item.isValidString() && isNotSpace(item);
			});
		}
		
	}
	
	return isValidStr;
}


function isNotSpace(value){
	var item = value.trimString();
	
	return (item.length > 0);
}


function isValidType(type){
	
	return (type && isValidInputType(type));
}


function isValidAllTypes(type){
	
	return (type && isValidHtml5Types(type));
}


function isValidInputType(type){
	var types = ["button", "image", "reset", "submit"];
	
	return !types.isContainAnItemInArray(type);
}


function isValidHtml5Types(type){
	//all HTML5 types
	var types = ["text", "password", "datetime", "datetime-local", "date", "month", "time", "week", "number", "email", "url", "search", "tel", "color"];
	
	return types.isContainAnItemInArray(type);
}