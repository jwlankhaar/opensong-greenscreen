# OpenSong Greenscreen

Jan-Willem Lankhaar, July 2020.

An HTML-file (`greenscreen.html`) that creates a websocket connection to OpenSong and formats the slide show with a greenscreen.

The webpage can be used as a source in video streaming software (e.g. OBS Studio) that support greenscreen or chroma key filtering.

It supports a greenscreen for all types of slides, except type `image` and `external` (e.g. VLC videos and PowerPoint). The former are presented as is, the latter are not yet supported. Hence, a presentation containing slides of the `external` type will not present entirely properly in the webbrowser.

# How to get slides with greenscreen support?

Greenscreen can be used with any regular OpenSong slide set (except for the mentioned restrictions regarding supported slide types). Transparency of subsequent slides can be toggled on and off by appending a `#` to the slide name.

1. Create a regular slide set in OpenSong.

2. Select the first slide that should be displayed on a greenscreen (i.e. the first slide that should have a transparent background in the video stream).

3. Append a `#` to the slide name. If for example the first slide with greenscreen should be `Welcome`, its name should be changed to `Welcome#` and if the first slide after it without greenscreen should be `Scripture reading` the name of the latter should be changed to `Scripture reading`.

4. Save the slide set.

5. Start the presentation.

6. Open the file `greenscreen.html` in a webbrowser.

7. Add the webbrowser as a source to the streaming video software and add a Chroma key or Color filter to turn the greenscreen into a transparent background.


# Notes

- Be sure to correctly configure the OpenSong API (*Settings* > *General Settings* > *System*) and the system network connection properties.
- The greenscreen and text formatting can be configured in the CSS-file (`greenscreen.css`). Its default configuration uses an outline font for optimal legibility when the green filter is applied. 
- The URL to the OpenSong API is assumed to be on localhost (port 80), but this can easily be changed in the JavaScript code in the HTML-page (greenscreen.html). 
