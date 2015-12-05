

function UserController(){}


UserController.prototype.initSignIn = function(){
	setOnKeyupListener($("#email"), clearError);
	setOnKeyupListener($("#password"), clearError);
	
	setOnEnterKeyListener($("#email"), clickOnLogin);
	setOnEnterKeyListener($("#password"), clickOnLogin);
	setOnButtonClickListener($(".login"), clickOnLogin);
	
	$("#email").focus();
};


UserController.prototype.initSignUp = function(){
	setOnKeyupListener($("#email"), clearError);
	setOnKeyupListener($("#password"), clearError);
	setOnKeyupListener($("#confirm"), clearError);
	
	setOnEnterKeyListener($("#email"), clickOnLogin);
	setOnEnterKeyListener($("#password"), clickOnLogin);
	setOnEnterKeyListener($("#confirm"), clickOnLogin);
	setOnButtonClickListener($(".signup"), clickOnLogin);
	
	$("#email").focus();
};


function clearError(){
	$(".error-star").html("");
}


function clickOnLogin(selector){
	//Validate data
	if(!isValidInput()){
		
		return;
	}
	
	document.location.href = "vegas/home.html";
}


function isValidInput(){
	var isValid = true;
	var email = $("#email").val();
	var confirm = $("#confirm").val();
	var password = $("#password").val();
	var emailExp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var pwdExp = /(?=^.{8,}$)(?=[^A-Za-z]*[A-Za-z])(?=[^!,@,#,$,%,^,&,*,?,_,~,-,(,)]*[!,@,#,$,%,^,&,*,?,_,~,-,(,)])/;
	
	if(email.length == 0){
		$(".error-star").html("Email address cannot be empty.");
		$("#email").focus();
		isValid = false;
	}
	else if(!emailExp.test(email)){
		$(".error-star").html('Invalid email address.');
		$("#email").focus();
		isValid = false;
	}
	else if(password.length == 0){
		$(".error-star").html("Password cannot be empty.");
		$("#password").focus();
		isValid = false;
	}
	else if(!pwdExp.test(password)){
		$(".error-star").html("At least 8 characters with text & special characters.");
		$("#password").focus();
		isValid = false;
	}
	else if(confirm && confirm.length == 0){
		$(".error-star").html("Confirm Password cannot be empty.");
		$("#confirm").focus();
		isValid = false;
	}
	else if(confirm && !(password.toLowerCase() === confirm.toLowerCase())){
		$(".error-star").html("Passwords do not match.");
		$("#confirm").val("");
		$("#confirm").focus();
		isValid = false;
	}
	
	return isValid;
}
