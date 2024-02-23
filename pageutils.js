/* ---------------------------------------------------------------------------*/
// 
//  Utility functions for presentation on the HTML page.
// 
/* ---------------------------------------------------------------------------*/

function convertBlobToImage(imageBlob) {
    var img = new Image();
    img.src = URL.createObjectURL(imageBlob);
    return img;
}

function resetScreenHTML() {
    $('#content').html('');   // Reset screen.
    turnGreenscreenOff();
}

function addImageHTML(img) {
    $('#content').append(`<img src=${img.src}>`)
}

function addTextHTML(txt) {
    var html;

    if (txt.length > 0 && /[\n\t\r]+/.test(txt)) {
        // Show text verbatim, if it contains newlines, tabs or linefeeds.
        html = `<pre>${txt}<\pre>`;
    } else {
        html = `<p>${txt}<\p>`;
    }
    $('#content').append(html);
}

function turnGreenscreenOn() {
    $('body').addClass('greenscreen');
}

function turnGreenscreenOff() {
    $('body').removeClass('greenscreen');
}

function setTitleAlert(message) {
    var title;

    title = $('title').text();
    title += ` (${message})`;
    title = title.replace('()', '');
    $('title').text(title);
}