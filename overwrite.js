chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
	suggest({filename: '..', conflictAction: 'overwrite'});
});