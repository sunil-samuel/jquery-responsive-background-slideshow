<p align='right'>
<small>Sunil Samuel<br>
web_github@sunilsamuel.com<br>
http://www.sunilsamuel.com<br>
https://sunil-samuel.github.io/#jquery-rbs
</small>
</p>


# jquery-responsive-background-slideshow

**JQuery Responsive Background Slideshow** :: Slideshow for the background using JQuery animation

JQuery plugin that can create a background slideshow.  This plugin works differently than a carousel plugin in that the content of the element do not need to change while the background images changes.

## Usage

```javascript
<script type="text/javascript">
  $(function() {
    $(".bg").bgSlideShow();
  });
</script>

<body>
  <div class=".bg">Hello</div>
</body>
```

Complete option usage with JavaScript:

```javascript
$(function () {
  $(".bg").bgSlideShow({
    current : 0,
    images : ["../gfx/first.png", "../gfx/second.png"],
    transitionDelay : 5000, // 5 seconds
    transitionSpeed : 3000, // 3 seconds
    transitionEffect : 'fade-in',
    randomize : false, 
    initialBackground : 'random',
    debug : true,
    eventHandlers : {
      beforeInit: myBeforeInitFunc,
      afterInit: myAfterInitFunc,
      beforeChange : myBeforeChangeFunc,
      afterChange : myAfterChangeFunc
     },
     slideControls: {
       enabled: true,
       classes: 'something'
     }
  });
});
```

Complete option usage with data attributes:

```html
<div class='bg' data-current="0"
  data-images="../gfx/first.png,../gfx/second.png"
  data-transitionDelay="5000" data-transitionSpeed="3000"
  data-transitionEffect="fade-in" data-randomize="true"
  data-initialBackground="2" data-debug="false">
      HTML content for the div
</div>
```

## Examples

Take a look at the [Demo](https://sunil-samuel.github.io/index.html#pages/jquery/rbs.html)

The following examples are provided:

* [example1.html](examples/example1.html) :: Random background selection given a list of images for a single div element.
* [example2.html](examples/example2.html) :: Multiple div elements with different transition speed and transition delay.
* [example3.html](examples/example3.html) :: Background slideshow for the body sized element.

## Options and Data Attributes

Each option parameter has a corresponding data attribute so that multiple elements could have different option parameters.  The ***data-*** attribute always has the precedence over the options
provide when calling the ***.bgSlideShow({options...})*** plugin.

For instance,

```javascript
$(function () {
  $(".bg").bgSlideShow({
    transitionSpeed : 3000
  });
});

<div class='bg' data-transitionSpeed=5000>content<div>
```
### Background Image Directives

The following are options used to define which background image and transitions are used.

>  **current** or **data-current** (default: 0) [Number]
>> Given the list of images, current defines which image to use first.  If `randomize` is set to 	`true`, then current is not used.

>  **images** or **data-images** (default: []) [Array of Strings]
>>  List of images to use to create the background slideshow.

> **transitionDelay** or **data-transitionDelay** (default: 5000 or 5 seconds) [Number]
>> Amount of milliseconds to wait before starting the next transition to the next image.

> **transitionSpeed** or **data-transitionSpeed** (default: 3000 or 3 seconds) [Number]
>> Amount of milliseconds for the transition effect to take

> **transitionEffect** or **data-transitionEffect** (default: fade-in) [String]
>> The type of animation for the transition effect.  Currently only 'fade-in' is implemented.

> **randomize** or **data-randomize** (default: false) [Boolean]
>> ***true*** - The images selected for the transition are picked randomly and not sequentially.<br>
>> ***false*** - The images selected for the transition are picked sequentially starting from `current`.

> **initialBackground** or **data-initialBackground** (default: null) [Number, 'random', url]
>> If set to anything other than null, then pick a background image from the list of images for the given element.<br>
>> ***Number*** - A number between 0 and the length of the `images` array.  [0, images.length).  The background of the element is set to this image in the `images` array.<br>
>> ***'random'*** - The word 'random' indicate to pick a random image from the list of images in the `images` array to use as the initial background.<br>
>> ***image url*** - The url to an image will be used as the background image for this element.

> **debug** or **data-debug** (default: false) [Boolean]
>> ***true*** - Print debug messages to the console.log for debugging purposes.<br>
>> ***false*** - No debug messages

### Slide Controls

Slide controls define whether to show the small 'ball' element in the middle of the image
for the user to select which image to view.

> **enabled** or **data-slidecontrols.enabled** (default: true) [Boolean]
>> Enable the slide controls so that the user will be able to see it.

> **classes** or **data-slidecontrols.classes** (default:null) [String]
>> Define one or more class(es) to add to the div that sets the slide control.

### Event Handlers

Events handlers will be invoked for different events.  All event handlers are defaulted to null.

> **beforeInit** - arguments (element, settings)
>> Event triggered before any of the processing is started.

> **afterInit** arguments (element, settings)
>> Event triggered after the processing is completed and the timer is set

> **beforeChange** arguments (element, settings, nextImage)
>> Event triggered before the transition from the existing image to the next image.  The current image can be accessed using $(element).css("background-image")

> **afterChange** arguments (element, settings, currentImage)
>> Event triggered after the transition from current image to the next image is complete.