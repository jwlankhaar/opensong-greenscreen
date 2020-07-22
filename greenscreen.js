var ws, itemnumber, transparentSlides;

$(document).ready(
    function () {
        var opensongMessageParser;

        // Initialize globals.
        itemnumber = null;
        transparentSlides = [];
        ws = createWebSocket();

        opensongMessageParser = new OpenSongMessageParser();
        
        ws.onopen = function(event) { onOpen(event) };
        ws.onmessage = function(event) { onMessage(event, opensongMessageParser) };
        ws.onerror = function(event) { onError(event) };    
    }
)

function createWebSocket() {
    var wsPars = config.websocket;
    var wsURI = `ws://${wsPars.host}:${wsPars.port}/ws`;
    return new WebSocket(wsURI);
}

function onOpen(event) {
    ws.send(config.websocket.methods.subscribeToWebSocketURI);
    console.log(`Requested websocket subscription. (${config.websocket.methods.subscribeToWebSocketURI})`);
}

function onMessage(event, messageParser) {
    var uri, sendUri, itemnumber;

    wsMethods = config.websocket.methods;
    uri = messageParser.parse(event.data);
    console.log('Reconstructed uri '+ uri);
    switch(uri) {
        case '/presentation/status':
            if (messageParser.isPresentationRunning) {
                itemnumber = messageParser.itemnumber;
                setTitleAlert('');
                console.log('Presentation is running. Current item is ' + itemnumber);
            } else {
                console.log('Presentation is not running.');
                setTitleAlert('presentation is not running')
                resetScreenHTML();
            }
            ws.send(wsMethods.listSlidesInSetURI);
            break;
        case '/presentation/slide':
            console.log('Slide set received.');
            sendUri = wsMethods.getSlideAsXMLURI;
            sendUri = sendUri.replace('/identifier', '/' + messageParser.itemnumber);
            // Request the current slide. Now, itemnumber has to be used
            // instead of slideId.
            ws.send(sendUri);
            break;
        case '/presentation/slide/identifier':
            console.log('Individual slide received.');
            switch (messageParser.mode) {
                case 'normal':
                    if (messageParser.transparentSlides.includes(messageParser.identifier)) {
                       showSlideOnGreenscreen(messageParser);
                    } else if (messageParser.type != 'external') {
                       requestSlideAsImage(messageParser.identifier);
                    }
                    break;
                case 'freeze':
                    break;      // Leave screen as is.
                case 'white':
                case 'black':
                    resetScreenHTML();
                    turnGreenscreenOn();
                    break;
            }
            break;
        case '/presentation/slide/identifier/image':
            if (messageParser.image) {
                resetScreenHTML();
                addImageHTML(messageParser.image);
            }
            break;
        default:
            console.log('Default: uri =' + uri + '; item = ' + messageParser.itemnumber);
    }
}     
        
function requestSlideAsImage(identifier) {
    var uri;
    uri = config.websocket.methods.getSlideAsImageURI;
    uri = uri.replace('/identifier/', '/' + identifier + '/');
    uri += '/width:1920/quality:100';
    ws.send(uri);
    console.log('Slide ' + identifier + ' was requested as image.');
}

function onError(event) {
    console.log('A websocket error occured: ' + event.data);
}

function showSlideOnGreenscreen(messageParser) {
    resetScreenHTML();
    if (messageParser.body) {
        addTextHTML(messageParser.body);
    }
    turnGreenscreenOn();    
}


