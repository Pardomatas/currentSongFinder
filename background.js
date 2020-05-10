// To set 
chrome.storage.local.set({'isEnabled':false});

function click(e) {
	// To get
	chrome.storage.local.get('isEnabled', function(data){
		console.log(data.isEnabled); 
		
		let isEnabled = data.isEnabled;

		if(isEnabled) {
			chrome.browserAction.setBadgeText({text: "Off"});
		} else if(!isEnabled) {
			chrome.browserAction.setBadgeText({text: "ON"});
		}
		isEnabled = !isEnabled;
		chrome.storage.local.set({'isEnabled':isEnabled});
	})
}


function clearDownloads() {
	setTimeout(function() {
		chrome.downloads.erase({state: "complete", filenameRegex: "^.*songTitle.*$"});
	}, 1000)
};

chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
	suggest({filename: "songTitle.txt", conflictAction: "overwrite"});	
});
	
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {	
	chrome.storage.local.get('isEnabled', function(data){

		if(data.isEnabled) {

			if(details.frameId === 0) {
				// Fires only when details.url === currentTab.url
				chrome.tabs.get(details.tabId, function(tab) {
					if(tab.url === details.url) {
						chrome.tabs.executeScript(null, {file: "findTitle.js"});
					}
				});
			}
		}
	})
});
	
chrome.downloads.onChanged.addListener(function (event) {
	chrome.storage.local.get('isEnabled', function(data){
		
		if(data.isEnabled) {

			if (typeof event.state !== "undefined") {
				if (event.state.current === "complete") {
					clearDownloads();
				}
			}
		}

	})
});

chrome.browserAction.onClicked.addListener(click);