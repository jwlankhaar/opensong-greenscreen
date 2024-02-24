var config = {
    "websocket": {
        "host": "localhost",
        "port": 8082,
        "uri": {
            "methods": {
                "subscribeToWebSocket": "/ws/subscribe/presentation",
                "getPresentationStatus": "/presentation/status",
                "listSlidesInSet": "/presentation/slide",
                "getSlideAsImage": "/presentation/slide/identifier/image",
                "getSlideAsXML": "/presentation/slide/identifier"
            },
            "parameters": {
                "imageProperties": "/width:1920/quality:100"
            }
        }
    },
    "transparency": {
        "transparentSlideTypes": ["blank", "custom", "song", "scripture"]
    }
};
