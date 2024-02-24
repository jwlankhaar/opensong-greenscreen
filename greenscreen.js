var ws, itemnumber, transparentSlides;
var WS_METHODS = config.websocket.uri.methods;
var WS_PARAMS = config.websocket.uri.parameters;


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
    var pars = config.websocket;
    var uri = `ws://${pars.host}:${pars.port}/ws`;
    return new WebSocket(uri);
}

function onOpen(event) {
    ws.send(WS_METHODS.subscribeToWebSocket);
    console.log(`Requested websocket subscription. (${WS_METHODS.subscribeToWebSocket})`);
}

function onMessage(event, parser) {
    var uri, sendUri, itemnumber;

    uri = parser.parse(event.data);
    console.log(`Reconstructed uri: ${uri}`);
    switch (uri) {
        case WS_METHODS.getPresentationStatus:
            if (parser.isPresentationRunning) {
                itemnumber = parser.itemnumber;
                setTitleAlert('');
                console.log(`Presentation is running. Current item is ${itemnumber}`);
            } else {
                console.log('Presentation is not running.');
                setTitleAlert('presentation is not running')
                resetScreen();
            }
            ws.send(WS_METHODS.listSlidesInSet);
            break;
        case WS_METHODS.listSlidesInSet:
            console.log('Slide set received.');
            sendUri = WS_METHODS.getSlideAsXML.replace(
                '/identifier',
                '/' + parser.itemnumber
            );
            // Request the current slide. Now, itemnumber has to be used
            // instead of slideId.
            ws.send(sendUri);
            break;
        case WS_METHODS.getSlideAsXML:
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
                        // requestSlideAsImage(parser.identifier);
                        sendUri = WS_METHODS.getSlideAsImageURI.replace(
                            '/identifier/', `/${identifier}/${WS_PARAMS.imageProperties}`
                        );
                        console.log(`Request slide ${identifier} as image.`)
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
        case WS_METHODS.getSlideAsImage:
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

