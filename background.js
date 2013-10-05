var storage = chrome.storage.local;


// Process urls
function loadUrls(stringToLoad){
	
	var urls=[];
	var i=0;
	if (stringToLoad != ""){
		urlsList=stringToLoad.split("\n");
		while(i <urlsList.length){
			if (urlsList[i] !="" && urlsList[i][0] != ";"){
				urls.push(urlsList[i]);
			}
			i++;
		}
	}
	console.log(urls);
	try{
		chrome.webRequest.onBeforeRequest.addListener(
		  function(details) { return {cancel: true}; },
			{urls: urls},
			["blocking"]
		);
	} catch(e){
		//console.log(e);
		//console.log(e.message);
		alert(e.message);
	}
}

// Add listener to re-process urls if settings changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
	//console.log(changes);
	if (changes.urls.newValue){
		loadUrls(changes.urls.newValue);
	} else { 
		loadUrls("");
	}
	
});

//Load settings
storage.get('urls', function(items) {
	if (items.urls) {
		loadUrls(items.urls);
	}
});


