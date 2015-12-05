/*************************************************************
**	create base backend api class for next extend
*************************************************************/

function BaseJSNetwork() {}

/** ===================== Synchronize Request (Parallel Request) =========================== **/

BaseJSNetwork.prototype.getRequest = function(requestUrl,requestData,responseHandler,failureHandler) {
	$.get(requestUrl , requestData, function(response){
		responseHandler(response);
	},"json")
	.error(function(jqXHR, textStatus, errorThrown){
		failureHandler(jqXHR, textStatus, errorThrown);
		if(jqXHR.status == 500){
			alert(errorThrown);
		}
	});
};


BaseJSNetwork.prototype.postRequest = function(requestUrl,requestData,responseHandler,failureHandler) {
	return $.post(requestUrl , requestData, function(response, textStatus, jqXHR){
		responseHandler(response, textStatus, jqXHR);
	},"json")
	.error(function(jqXHR, textStatus, errorThrown){
		failureHandler(jqXHR, textStatus, errorThrown);
		if(jqXHR.status == 500){
			alert(errorThrown);
		}
	});
};


BaseJSNetwork.prototype.deleteRequest = function(requestUrl,responseHandler,failureHandler){
	$.ajax({
		async: true,
		type: "DELETE",
		url: requestUrl,
		crossDomain: true,
		accept: "*",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			responseHandler(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			failureHandler(jqXHR, textStatus, errorThrown);
			if(jqXHR.status == 500){
				alert(errorThrown);
			}
		}
	});
};


BaseJSNetwork.prototype.generateRequest = function(requestUrl,requestData,reqType,responseHandler,failureHandler){
	$.ajax({
		async: true,
		type: reqType, //POST,GET,DELETE
		dataType: 'json',
		url: requestUrl,
		data: requestData,
		contentType: 'application/json',
		success: function(response, textStatus, jqXHR){
			responseHandler(response, textStatus, jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown){
			failureHandler(jqXHR, textStatus, errorThrown);
			if(jqXHR.status == 500){
				alert(errorThrown);
			}
		}
	});
};

/** ======== Non-Synchronize Request ================= **/

BaseJSNetwork.prototype.makeRequest = function(requestUrl,errMsg) {
	var isComplateRequest = false;
	var response = null;
	var request = $.ajax({
		async: false,
		type: "GET",
		url: requestUrl,
		crossDomain: true,
		accept: "*",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			isComplateRequest = true;
			response = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
		},
		complete: function(){
			isComplateRequest = true;
			return this;
		}
	});
	if(request.status != 200){
		return this.handleError(request,errMsg, isComplateRequest);
	}else{
		return response;
	}
};
BaseJSNetwork.prototype.handleError = function(request,errMsg, isComplateRequest){
	switch(request.status){
		case 401:
			if(isComplateRequest){
				alert('Your current session has expired please log back in.');
			}
			break;
		case 409:
			if(errMsg != undefined){
				if(isComplateRequest){
					alert(errMsg);
				}
			}else{
				if(isComplateRequest){
					alert("Can't delete item due to the integrity constraint.");
				}
			}
			break;
		default:
			if(typeof(errMsg) != 'undefined'){
				if(isComplateRequest){
					alert(errMsg);
				}
			}else{
				if(isComplateRequest){
					alert('An error occured, please try again.');
				}
			}
	}
	
	return 'error';
};