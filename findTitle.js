function getTitle() {
    let titleElement = document.getElementsByTagName("title")[0].textContent;
    if (titleElement != "YouTube") {

        let title = titleElement.substring(0, titleElement.length - 9);

        console.log(title);

        console.save(title);
        
    }
}

setTimeout(getTitle, 1000);

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