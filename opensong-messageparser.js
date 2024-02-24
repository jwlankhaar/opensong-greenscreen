/* ------------------------------------------------------------------------- */
// 
//  Class OpenSongMessageParser
// 
// Class that facilitates parsing the OpenSong websocket messages. Only 
// a limited set of message types is supported. The corresponding URI is 
// reconstructed on parsing. Note that this is not unambiguously, because 
// different URIs may yield the same message.
// 
/* ------------------------------------------------------------------------- */

class OpenSongMessageParser {
    constructor() {
        this.isXMLMessage = null;
        this.XML = null;
        this.image = null;
        this.isPresentationRunning = null;
        this.mode = null;
        this.itemnumber = null;
        this.identifier = null;
        this.type = null;
        this.transparentSlides = [];
        this.body = null;
        this.transparencyTypes = config.transparency.transparentSlideTypes;
        this.title = null;
        this.subtitle = null;
        this.notes = null;
    }

    initMessage(message) {
        if (message instanceof Blob) {
            this.isXMLMessage = false;
            this.image = new Image();
            this.image.src = URL.createObjectURL(message);
        }
        else {
            try {
                this.XML = $.parseXML(message);
                this.isXMLMessage = true;
            }
            catch (error) {
                this.isXMLMessage = false;
            }
        }
    }

    getResourceAction() {
        var responseElement, resource, action;

        if (this.isXMLMessage) {
            responseElement = this.XML.getElementsByTagName('response')[0];
            resource = responseElement.getAttribute('resource');
            action = responseElement.getAttribute('action');
            return resource + '/' + action;
        }
        else {
            return null;
        }
    }

    getElementValue(xml, tagName) {
        var element, value = null;

        element = xml.getElementsByTagName(tagName);
        if (element.length > 0 && element[0].firstChild) {
            value = element[0].firstChild.nodeValue;
        }
        return value;
    }

    parse(message) {
        var presentationElement, slideElement, responseElement, slides,
            slideId, uri, type;

        this.initMessage(message);
        if (this.isXMLMessage) {
            this.resourceAction = this.getResourceAction();
            switch (this.resourceAction) {
                case 'presentation/status':
                    presentationElement = this.XML.getElementsByTagName('presentation')[0];
                    this.isPresentationRunning = presentationElement.getAttribute('running') == "1";
                    if (this.isPresentationRunning) {
                        slideElement = presentationElement.getElementsByTagName('slide')[0];
                        this.itemnumber = slideElement.getAttribute('itemnumber');
                        this.mode = this.getElementValue(presentationElement, 'screen');
                    }
                    else {
                        this.itemnumber = null;
                    }
                    uri = '/presentation/status';
                    break;
                case 'presentation/slide':
                    responseElement = this.XML.getElementsByTagName('response')[0];
                    uri = '/presentation/slide';
                    if (responseElement.hasAttribute('identifier')) {   // Single slide.
                        this.identifier = responseElement.getAttribute('identifier');
                        slideElement = responseElement.getElementsByTagName('slide')[0];
                        this.type = slideElement.getAttribute('type');
                        this.body = this.getElementValue(slideElement, 'body');
                        this.title = this.getElementValue(slideElement, 'title');
                        this.subtitle = this.getElementValue(slideElement, 'subtitle');
                        uri += '/identifier';
                    }
                    else {  // Slide set.
                        slides = responseElement.getElementsByTagName('slide');
                        for (var i = 0; i < slides.length; i++) {
                            type = slides[i].getAttribute('type');
                            if (this.transparencyTypes.includes(type) &&
                                slides[i].hasAttribute('identifier')) {
                                slideId = slides[i].getAttribute('identifier');
                                this.transparentSlides.push(slideId);
                            }
                        }
                    }
                    break;
                default:
                    console.log(`Unknown message type: ${uri}`);
            }
        } else {
            uri = '/presentation/slide/identifier/image';
        }
        return uri;
    }
}
