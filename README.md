# OpenSong Greenscreen

Jan-Willem Lankhaar, July 2020.

An HTML-file (`greenscreen.html`) that creates a websocket connection to OpenSong and formats the slide show with a green screen.

The webpage can be used as a source in video streaming software (e.g. OBS Studio) that support green screen or chroma key filtering.

It supports a green screen for all types of slides, except type `image` and `external` (e.g. VLC videos and PowerPoint). The former are presented as is, the latter are not yet supported. Hence, a presentation containing slides of the `external` type will not present entirely properly in the webbrowser.

# How to get slides with greenscreen support?

OpenSong Green screen can be used with any regular OpenSong slide set (except for the mentioned restrictions on supported slide types). All slides of the types `custom`, `blank`, `song` and `scripture` will be rendered as text on a transparent background.

1. Create a regular slide set in OpenSong.

2. Save the slide set.

3. Start the presentation.

4. Open the file `greenscreen.html` in a webbrowser.

Note that by editing the file `greenscreen.css` the text can also be displayed on a green background that can be removed by the streaming video software (using a Chroma key or Color filter).


# How to set up a Browser source in OBS Studio with a green screen?

Since OBS Studio ships with its own web browser engine, the file `greenscreen.html` does not have to be opened in a web browser (step 6 above).

## Add the Browser source

1. Start OBS Studio and add a Scene.

2. In the scene, add a **Browser** source

3. Select **Create new**, enter a name for the source (e.g. `OpenSong Greenscreen`) and click **OK***

4. Check the checkbox in front of **Local file**, click **Browse** and select the file `greenscreen.html`

5. Set **Width** and **Height** to 1920 and 1080, respectively

6. Replace the code in the **Custom CSS** frame with 

    `body { overflow:hidden;}`

7. Scroll down the window and check the checkbox in front of **Refresh browser when scene becomes active** 

## Add a Chroma key filter to the source

Note that a Chroma key filter is only neccessary when the green background color option is chosen in `greenscreen.css`. 

1. Right-click the created browser source and click **Filters**

2. In the lower panel (**Effect filters**), click the plus sign and select **Chroma Key**

3. Enter the following settings:

    | Parameter                 | Value |
    | ------------------------- | ----: |
    | Key Color Type            | Green |
    | Similarity                |   400 |
    | Smoothness                |    80 |
    | Key Color Spill Reduction |   100 |
    | Opacity                   |   100 |
    | Contrast                  |     0 |
    | Brightness                |     0 |
    | Gamma                     |     0 |

4. Click **Close**



# Notes

- Be sure to correctly configure the OpenSong API (*Settings* > *General Settings* > *System*) and the system network connection properties.
- The greenscreen and text formatting can be configured in the CSS-file (`greenscreen.css`). Its default configuration uses an outline font for optimal legibility when the green filter is applied. 
- The URL to the OpenSong API is assumed to be on localhost (port 80), but this can be changed in `config.js`. 
- After adding the source and the chroma key, the source may not always be active immediately. Toggle source visibility a few times or select a new slide in OpenSong to activate it.

# TODO

- Create a workaround for `external` slide type.

# Release notes July 17, 2020

## Major update

- Code entirely refactored
- Screen sizing issues fixed (now fully tailored to 1920 x 1080)
- Separate config file added
- Optimal font sizing configured
- Added alert presentation not running to browser tab title
- Added support for OpenSong freeze, black and white screen modes

# Release notes July 22, 2020

- All transparent type slides are _always_ displayed on greenscreen (i.e. toggling by `#` in the name is removed).
- Added transparent background option (default) which bypasses the need for a Chroma key filter.

# Release notes February 23, 2024

- Text always aligns vertically to the bottom.
- Font changed (font family, color slightly off-white).
- A few minor code changes.

# Release notes February 26, 2024

- Separate containters for text and images, making text and image sizing more flexible.
- Move URI's to separate file (`wsschema.js` instead of in `config.js` file).
- Minor code changes.
