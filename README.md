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


## Examples

Take a look at the [Demo](https://sunil-samuel.github.io/#jquery-rbs)

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
	
> **current ** or **data-current** (default: 0)
>> Given the list of images, current defines which image to use first.  If `randomize` is set to 	`true`, then current is not used.
>>> <div data-current=0>content</div>

> **image** 