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
    $('body').removeClass('greenscreen');
}

function addImageHTML(img) {
    $('#content').append(`<img src=${img.src}>`)
    // $('#content').append(img);
}

function addTextHTML(txt) {
    // $('body').html(`<pre>${txt}</pre>`);
    $('#content').append(`<pre>${txt}<\pre>`);
    // document.body.appendChild.html(`<pre>${txt}<\pre>`);
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