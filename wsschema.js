var URI = {
    "baseUri": `ws://${config.websocket.host}:${config.websocket.port}/ws`,
    "subscribeToWebSocket": "/ws/subscribe/presentation",
    "getPresentationStatus": "/presentation/status",
    "listSlidesInSet": "/presentation/slide",
    "getSlideAsImage": "/presentation/slide/identifier/image",
    "getSlideAsXML": "/presentation/slide/identifier",
    "imageProperties": "/width:1920/quality:100"
};