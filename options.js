// Save this script as `options.js`
var storage = chrome.storage.local;
restore_options();

// Restores select box state to saved value from localStorage.
function restore_options() {
	storage.get('urls', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
	//console.log(items);
    if (items.urls) {
		document.getElementById("urls").value = items.urls;
		loadUrls(items.urls);
    }
  });
}

document.getElementById('save').addEventListener('click', function(){
	storage.set({'urls': document.getElementById("urls").value}, function() {
		// Notify that we saved.
		var status = document.getElementById("status");
		status.innerHTML = "Options Saved.";
		setTimeout(function() {
			status.innerHTML = "";
		}, 750);
	  });

});