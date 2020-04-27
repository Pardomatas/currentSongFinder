function getTitle() {
    var targetNode = document.querySelector("h1.title.style-scope.ytd-video-primary-info-renderer");

    if (!targetNode) {
        window.setTimeout(getTitle, 500);
        return;
    }

    console.log(targetNode.innerText);
    console.save(targetNode.innerText);
}

setTimeout(getTitle, 2000);

(function(console) {

    console.save = function(data) {

        let filename = 'songTitle.txt';

        if(typeof data === "object") {
            data = JSON.stringify(data, undefined, 4);
        }

        let blob = new Blob([data], {type: 'text/plain'}),
            event = document.createEvent('MouseEvents'),
            aTag = document.createElement('a');

        aTag.download = filename;
        aTag.href = window.URL.createObjectURL(blob);
        aTag.dataset.downloadurl =  ['text/plain', aTag.download, aTag.href].join(':');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        aTag.dispatchEvent(event);
    }
})(console)