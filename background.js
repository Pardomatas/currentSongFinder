chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
	suggest({filename: '..', conflictAction: 'overwrite'});
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"findTitle.js"});
});