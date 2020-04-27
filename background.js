chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
	suggest({filename: "..", conflictAction: "overwrite"});
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null, {file: "findTitle.js"});
});

function clearDownloads() {
	setTimeout(function() {
		chrome.downloads.erase({state: "complete", filenameRegex: "^.*songTitle.*$"});
	}, 1000)
};

chrome.downloads.onChanged.addListener(function (e) {
	if (typeof e.state !== "undefined") {
		if (e.state.current === "complete") {
			clearDownloads();
		}
	}
});
