/* ---------------------------------------------------------------------------*/
// 
//  Utility functions for presentation on the HTML page.
// 
/* ---------------------------------------------------------------------------*/

function blobToImage(imageBlob) {
    var img = new Image();
    img.src = URL.createObjectURL(imageBlob);
    return img;
}

function resetScreen() {
    $('#texts').html('');
    $('#images').html('');
    $('body').removeClass('greenscreen');
}

function showImage(img) {
    let html = `<img src=${img.src}>`;
    $('#images').append(html);
}

function showText(txt) {
    let html = `<p>${preprocessText(txt)}</p>`;
    $('#texts').append(html);
}

function preprocessText(txt) {
    let regex = /[\n\r]{1}/;
    return txt.replace(regex, '<br>');
}

function turnGreenscreenOn() {
    $('body').addClass('greenscreen');
}

function turnGreenscreenOff() {
    $('body').removeClass('greenscreen');
}

function setTitleAlert(message) {
    var title = $('title').text();
    if (message.length > 0) {
        title += ` - ${message}`;
    }
    $('title').text(title);
}