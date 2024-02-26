var ws, itemnumber, transparentSlides;

$(document).ready(
    function () {
        var parser;

        // Initialize globals.
        itemnumber = null;
        transparentSlides = [];
        ws = createWebSocket();

        parser = new OpenSongMessageParser();

        ws.onopen = function (event) { onOpen(event) };
        ws.onmessage = function (event) { onMessage(event, parser) };
        ws.onerror = function (event) { onError(event) };
    }
)

function createWebSocket() {
    console.log(`Creating new websocket: ${URI.baseUri}`);
    return new WebSocket(URI.baseUri);
}

function onOpen(event) {
    console.log(`Requesting websocket subscription: ${URI.subscribeToWebSocket}`);
    ws.send(URI.subscribeToWebSocket);
}

function onMessage(event, parser) {
    var uri, sendUri, itemnumber;

    uri = parser.parse(event.data);
    console.log(`Reconstructed uri: ${uri}`);
    switch (uri) {
        case URI.getPresentationStatus:
            if (parser.isPresentationRunning) {
                itemnumber = parser.itemnumber;
                setTitleAlert('');
                console.log(`Presentation is running. Current item is ${itemnumber}`);
            } else {
                console.log('Presentation is not running.');
                setTitleAlert('presentation is not running')
                resetScreen();
            }
            ws.send(URI.listSlidesInSet);
            break;
        case URI.listSlidesInSet:
            console.log('Slide set received.');
            sendUri = URI.getSlideAsXML.replace(
                '/identifier',
                '/' + parser.itemnumber
            );
            // Request the current slide. Now, itemnumber has to be used
            // instead of slideId.
            ws.send(sendUri);
            break;
        case URI.getSlideAsXML:
            console.log('Individual slide received.');
            switch (parser.mode) {
                case 'normal':
                    if (parser.transparentSlides.includes(parser.identifier)) {
                        resetScreen();
                        if (parser.body) {
                            showText(parser.body);
                        }
                        turnGreenscreenOn();
                    } else if (parser.type != 'external') {
                        sendUri = URI.getSlideAsImage.replace(
                            'identifier', parser.identifier
                        ) + URI.imageProperties;
                        console.log(`Request slide ${parser.identifier} as image.`)
                        ws.send(sendUri);
                    }
                    break;
                case 'freeze':
                    break;      // Leave screen as is.
                case 'white':
                case 'black':
                    resetScreen();
                    turnGreenscreenOn();
                    break;
            }
            break;
        case URI.getSlideAsImage:
            if (parser.image) {
                resetScreen();
                showImage(parser.image);
            }
            break;
        default:
            console.log(`Default: uri = ${uri}; item = ${parser.itemnumber}`);
    }
}

function onError(event) {
    console.log('A websocket error occured: ' + event.data);
}

