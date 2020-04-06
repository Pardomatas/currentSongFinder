let checkExist = setInterval(function() {
    let titleElement = document.getElementsByTagName("title")[0].textContent;
    if (titleElement != "YouTube") {

        let title = titleElement.substring(0, titleElement.length - 9);

        console.log(title);

        console.save(title, "songTitle");

        clearInterval(checkExist);
    }
 }, 100);

 (function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'songTitle.txt'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/plain'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/plain', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)