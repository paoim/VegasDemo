$(function(){
	$.tools.validator.fn("[data-number-only=number]", "Please input only number", function(input, value) {
		return /^-?[0-9]*(\.[0-9]+)?$/.test(value);
	});
	$.tools.validator.fn("[data-selector=positive-number]", "Please select an item", function(input, value) {
		return "" != value;
	});
	$.tools.validator.fn("[data-password=password]", "Password should contain text with special character at least 8 characters.", function(input, value) {
		return (/(?=^.{8,}$)(?=[^A-Za-z]*[A-Za-z])(?=[^!,@,#,$,%,^,&,*,?,_,~,-,(,)]*[!,@,#,$,%,^,&,*,?,_,~,-,(,)])/.test(value));
	});
});


function VegasValidator(){}


VegasValidator.prototype.config = {
										offset: [10, 315], 
										position: 'top  center',
										messageClass: 'error',
										message: "<div><em/><p></p></div>",
										speed: 'normal'
									};

VegasValidator.prototype.validator = function(validatorSelector,customizedRules){
											var inputs = validatorSelector.validator({position: 'top  center', message: '<div><em/></div>',offset: [5, 110]});
											var returnValue = inputs.data("validator").checkValidity();
											return returnValue;
										 };

VegasValidator.prototype.mulitSelectedValidator = function(multiSelectedControl,validatorSelector,messageStr){
															validatorSelector.removeData("msgEl");
															this.config = $.extend(this.config,{offset: [4, 319]});
															
															if(validatorSelector.data("msgEl") == undefined){
																var message = $(this.config.message).addClass(this.config.messageClass).appendTo(document.body);
																var position = $.tools.validator.getPosition(validatorSelector,message,this.config);
																message.css({ visibility: 'hidden', position: 'absolute', top: position.top, left: position.left })
																.fadeIn(this.config.speed);
																message.find("p").text(messageStr);
																validatorSelector.data("msgEl",message);
															}
															
															var isValid = multiSelectedControl.multiselect("getChecked").map(function(){return this.value;}).get().length > 0;
															if(isValid){
																validatorSelector.data("msgEl").css({visibility: 'hidden'});
																return true;
															}
															else{
																validatorSelector.data("msgEl").css({visibility: 'visible'});
																return false;
															}
														};

VegasValidator.prototype.confirmPasswordValidator = function(passwordSelector,confirmSelector,messageStr){
															this.config = $.extend(this.config,{offset: [5, -18]});
															
															if(confirmSelector.data("msgEl") == null){
																var message = $(this.config.message).addClass(this.config.messageClass).appendTo(document.body);
																var position = $.tools.validator.getPosition(confirmSelector,message,this.config);
																message.css({ visibility: 'hidden', position: 'absolute', top: position.top, left: position.left })
																.fadeIn(this.config.speed);
																message.find("p").text(messageStr);
																confirmSelector.data("msgEl",message);
															}
															var isValid = (passwordSelector.val() == confirmSelector.val());
															if(isValid){
																confirmSelector.data("msgEl").css({visibility: 'hidden'});
																return true;
															}
															else{
																confirmSelector.data("msgEl").css({visibility: 'visible'});
																return false;
															}
														};

VegasValidator.prototype.validateUserProfile = function(){
															var isValidInput = this.validator($("#userPanelCenter input,#userPanelCenter select"));
															var isValidPasswordMatched = this.confirmPasswordValidator($('#user_password'),$('#user_confirmPassword'),"Your password not match, please try again.");
															
															return isValidInput && isValidPasswordMatched;
														};

VegasValidator.prototype.validateCreateEvent = function(){
													return this.validator($("#createNewEventDialog input"));
												};

VegasValidator.prototype.validateSelector = function(selector){
															return this.validator(selector);
														};

VegasValidator.prototype.validateSpecificSelector = function(validatorSelector, left){
													var messageStr = "Please select an item";
													validatorSelector.removeData("msgEl");
													this.config = $.extend(this.config,{offset: [5, left]});
													
													if(validatorSelector.data("msgEl") == undefined){
														var message = $(this.config.message).addClass(this.config.messageClass).appendTo(document.body);
														var position = $.tools.validator.getPosition(validatorSelector,message,this.config);
														$(message).attr("id", "msg_" + $(validatorSelector).attr("id"));
														message.css({ visibility: 'hidden', position: 'absolute', top: position.top, left: position.left })
														.fadeIn(this.config.speed);
														message.find("p").text(messageStr);
														validatorSelector.data("msgEl",message);
													}
													
													var isValid = validatorSelector.val() != "";
													if(isValid){
														validatorSelector.data("msgEl").css({visibility: 'hidden'});
														return true;
													}
													else{
														validatorSelector.data("msgEl").css({visibility: 'visible'});
														return false;
													}
												};

VegasValidator.prototype.cleanupValidatorErrorMessage = function(){
																	$(".error").each(function(){
																		$(this).css({visibility:"hidden"});
																	});
																};

VegasValidator.prototype.removeValidatorErrorMessage = function(){
																	$(".error").remove();
																};
