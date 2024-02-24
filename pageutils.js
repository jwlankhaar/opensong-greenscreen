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
    $('#text-container').html('');
    $('#image-container').html('');
    $('body').removeClass('greenscreen');
}

function showImage(img) {
    let html = `<img src=${img.src}>`;
    $('#image-container').append(html);
}

function showText(txt) {
    let html = `<p>${preprocessText(txt)}</p>`;
    $('#text-container').append(html);
}

function preprocessText(txt) {
    return txt.replaceAll('\n', '<br>');
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