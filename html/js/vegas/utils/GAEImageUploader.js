(function($){
	
	var DEFAULT_OPTIONS = "defaultOptions";
	
	// keep this function as public access
	var defaultOptions = {
			localPcName: "GGPP10321",
			loadingClass: "",
			uploadButtonClass: "",
			uploadUrl: "",
			onSuccess: "",
			isImageUpload: true,
			uploadButtonName: "Upload",
			callbackCsvPath: "", //for upload CSV file
			endInputSelector: "",
			imgPreview: null,
			saveButton: null
	};
	
	$.fn.gaeImageUploader = function(options){
		$(this).data(DEFAULT_OPTIONS, jQuery.extend(true, {}, defaultOptions));
		$.extend($(this).data(DEFAULT_OPTIONS),options);
		generateFileUploadUI($(this));
	};
	
	$.fn.gaeImageDragDropUploader = function(options){
		$(this).data(DEFAULT_OPTIONS, jQuery.extend(true, {}, defaultOptions));
		$.extend($(this).data(DEFAULT_OPTIONS),options);
		generateDragDropFileUploaderUI($(this));
	};
	
	// keep this function as private access
	
	function generateDragDropFileUploaderUI(drapDropZone){
		drapDropZone[0].addEventListener('dragover', function(event){handleDragOver(event, drapDropZone);}, false);
		drapDropZone[0].addEventListener('drop', function(event){handleDropFiles(event, drapDropZone);}, false);
	}
	
	function handleDragOver(event, dom){
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy'; 
	}
	
	function handleDropFiles(event, dom){
		event.stopPropagation();
		event.preventDefault();
		
		$(dom).data(DEFAULT_OPTIONS).imgPreview = event.target;
		
		var files = event.dataTransfer.files;
		readFile(files, dom);
	}
	
	function generateFileUploadUI(fileUploadEle){
		
		//create upload image container
		var ubId = getAttribute(fileUploadEle, "id") + "Button";
		var uploadButton = $("<button id='"+ubId+"' class='"+$(fileUploadEle).data(DEFAULT_OPTIONS).uploadButtonClass+"'>").text($(fileUploadEle).data(DEFAULT_OPTIONS).uploadButtonName);
		
		//hide browse file component
		fileUploadEle.hide();
		
		//prepare upload block
		fileUploadEle.after(uploadButton);
		
		// bind necessary event 
		uploadButton.bind("click",function(){
			fileUploadEle.trigger('click');
		});
		
		fileUploadEle.bind("change",function(){
			readFile(this.files, fileUploadEle, uploadButton);
		});
		
	}
	
	function readFile(files, dom, uploadButton){
		//No file to upload
		if(files.length == 0) return;
		
		//Allow to upload for disable mode
		if($(dom).data(DEFAULT_OPTIONS).endInputSelector.length > 0 && $("#" + $(dom).data(DEFAULT_OPTIONS).endInputSelector).is(":disabled")){
			alert("Cannot upload file for view mode.");
			
			return;
		}
		
		//Disable Upload Button
		setButtonStatus(uploadButton, false);
		
		//Disable Save Button
		setButtonStatus($(dom).data(DEFAULT_OPTIONS).saveButton, false);
		
		//Get file
		var file = files[0];
		var rFilter = /^(?:image\/png)$/i;
		
		//Check file type
		if ($(dom).data(DEFAULT_OPTIONS).isImageUpload && !rFilter.test(file.type)) {
			alert("The image's format should be \"png\".");
			
			//Enable Save Button
			setButtonStatus($(dom).data(DEFAULT_OPTIONS).saveButton, true);
			
			return;
		}
		
		var fileReader = new FileReader();
		fileReader.onload = function(){
			if($(dom).data(DEFAULT_OPTIONS).isImageUpload){
				//Get Image's Width
				var img = new Image;
				img.onload = function() {
					//setAttribute(imagePreview, "src", this.result);
					var imgPreviewWidth = 640;
					var imgPreviewHeight = 640;
					if ($(dom).data(DEFAULT_OPTIONS).imgPreview && $($(dom).data(DEFAULT_OPTIONS).imgPreview).data("width") && $($(dom).data(DEFAULT_OPTIONS).imgPreview).data("height")) {
						imgPreviewWidth = $($(dom).data(DEFAULT_OPTIONS).imgPreview).data("width");
						imgPreviewHeight = $($(dom).data(DEFAULT_OPTIONS).imgPreview).data("height");
					}
					var imageWidth = (img.width == 0 ? (img.naturalWidth == 0 ? imgPreviewWidth : img.naturalWidth) : img.width);
					var imageHeight = (img.height == 0 ? (img.naturalHeight == 0 ? imgPreviewHeight : img.naturalHeight) : img.height);
					var imageSize = (imageWidth > imageHeight ? imageWidth : imageHeight);
					
					if(imageWidth != imgPreviewWidth || imageHeight != imgPreviewHeight){
						alert("Image uploaded is not equal allowance(" + imgPreviewWidth + "x" + imgPreviewHeight + ") - " + imageWidth +"x" + imageHeight + ", please try to upload again.");
						
						//Enable Save Button
						setButtonStatus($(dom).data(DEFAULT_OPTIONS).saveButton, true);
						
						return;
					}
					
					submitFormData(file, dom, uploadButton, imageSize);
				};
				img.src = fileReader.result;
			}
			else{
				submitFormData(file, dom, uploadButton);
			}
			
		};
		
		fileReader.readAsDataURL(file);
	}
	
	function submitFormData(file, dom, uploadButton, imageSize){
		var formData = new FormData();
		if(file != undefined){
			formData.append("imageupload",file);
			
			//Add image width for upload image
			if($(dom).data(DEFAULT_OPTIONS).isImageUpload && imageSize != undefined){
				formData.append("imageSize", imageSize);
			}
			
			getGAEBlobUploadUrl(function(uploadUrl){
				doAjaxPost(uploadUrl, formData, dom, uploadButton);
			}, dom, uploadButton);
		}
	}
	
	function getGAEBlobUploadUrl(onSuccess, dom, uploadButton){
		doAjaxGet(onSuccess, dom, uploadButton);
	}
	
	function doAjaxGet(onSuccess, dom, uploadButton){
		var requestData = {};
		if($(dom).data(DEFAULT_OPTIONS).callbackCsvPath.length > 0){
			requestData.callbackPath = $(dom).data(DEFAULT_OPTIONS).callbackCsvPath;
		}
		
		$.ajax({
			url: $(dom).data(DEFAULT_OPTIONS).blobUrl,
			type: "GET",
			data: requestData,
			dataType: "JSON",
			success: function(response){
				uploadUrl = response.uploadUrl.replace($(dom).data(DEFAULT_OPTIONS).localPcName,"localhost");
				onSuccess(uploadUrl);
			}
		});
	}
	
	function doAjaxPost(uploadUrl,formData, dom, uploadButton){
		startAjaxAnimation(dom);
		$.ajax({
			url: uploadUrl,
			data: formData,
			processData: false,
			contentType: false,
			type: "POST",
			success: function(response){
				var jResponse = response;
				if(isString(response)){
					jResponse = JSON.parse(response);
				}
				$(dom).data(DEFAULT_OPTIONS).onSuccess(jResponse);
			},
			complete: function(){
				//Stop animation for upload image
				if($(dom).data(DEFAULT_OPTIONS).isImageUpload){
					stopAjaxAnimation(dom);
				}
				
				//Enable Upload Button
				setButtonStatus(uploadButton, true);
				
				//Enable Save Button
				setButtonStatus($(dom).data(DEFAULT_OPTIONS).saveButton, true);
			}
		});
	}
	
	function startAjaxAnimation(dom){
		$("." + $(dom).data(DEFAULT_OPTIONS).loadingClass).show();
	}
	
	function stopAjaxAnimation(dom){
		//setInterval(function(){
			$("." + $(dom).data(DEFAULT_OPTIONS).loadingClass).hide();
		//}, 600);
	}
	
	function getAttribute(element,attrKey){
		return element.attr(attrKey);
	}
	
	function setAttribute(element,attrkey,attrValue){
		element.attr(attrkey,attrValue);
	}
	
	function setButtonStatus(buttonSelector, isEnable){
		if(buttonSelector != null && buttonSelector){
			setActionControls(buttonSelector, isEnable);
		}
	}
	
	function isString(inputData){
		return $.type(inputData) === "string";
	}
	
})(jQuery);