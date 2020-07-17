var config = {
    "websocket": {
        "host": "localhost",
        "port": 8082,
        "methods": {
            "subscribeToWebSocketURI" : "/ws/subscribe/presentation",
            "getPresentationStatusURI": "/presentation/status",
            "listSlidesInSetURI" : "/presentation/slide",
            "getSlideAsImageURI" : "/presentation/slide/identifier/image",
            "getSlideAsXMLURI" : "/presentation/slide/identifier"
        }
    },
    "transparency": {
        "transparentSlideTypes": ["blank", "custom", "song", "scripture"]
    }
};
