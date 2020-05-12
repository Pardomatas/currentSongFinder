function enable() {
	chrome.browserAction.setBadgeText({text: "ON"});
	chrome.browserAction.setTitle({
		title:'Click to Disable Find Current Youtube Song for Twitch.'
	});
}

function disable() {
	chrome.browserAction.setBadgeText({text: "OFF"});
	chrome.browserAction.setTitle({
		title:'Click to Enable Find Current Youtube Song for Twitch.'
	});
}

function isEnabled() {
    return new Promise((resolve) => {
        chrome.storage.local.get('enabled', function (data) {
        	resolve(data);
        });
    });
}

async function switchTitleFinder() {
	var data = await isEnabled();
	let enabled = data.enabled;

	if(enabled === false) {
		enable();
		enabled = true;
	} else {
		disable();
		enabled = false;
	}

	chrome.storage.local.set({'enabled':enabled});
}

async function checkOnStart() {
	var data = await isEnabled();
	let enabled = data.enabled;

	if(enabled === false || enabled === null) {
		disable();
	} else {
		enable();
	}
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
	chrome.storage.local.get('enabled', function(data){
		if(data.enabled) {
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
	chrome.storage.local.get('enabled', function(data){
		if(data.enabled) {
			if (typeof event.state !== "undefined") {
				if (event.state.current === "complete") {
					clearDownloads();
				}
			}
		}
	})
});

checkOnStart();
chrome.browserAction.onClicked.addListener(switchTitleFinder);