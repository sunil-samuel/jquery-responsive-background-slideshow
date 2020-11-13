/**
 * Author  : Sunil Samuel (web_github@sunilsamuel.com)
 * License : GPLv3
 * GIT URL : https://github.com/sunil-samuel/jquery-responsive-background-slideshow
 * ______                                _           
 * | ___ \                              (_)          
 * | |_/ /___  ___ _ __   ___  _ __  ___ ___   _____ 
 * |    // _ \/ __| '_ \ / _ \| '_ \/ __| \ \ / / _ \
 * | |\ \  __/\__ \ |_) | (_) | | | \__ \ |\ V /  __/
 * \_| \_\___||___/ .__/ \___/|_| |_|___/_| \_/ \___|
 *                | |                                
 *                |_|                                
 * ______            _                                   _ 
 * | ___ \          | |                                 | |
 * | |_/ / __ _  ___| | ____ _ _ __ ___  _   _ _ __   __| |
 * | ___ \/ _` |/ __| |/ / _` | '__/ _ \| | | | '_ \ / _` |
 * | |_/ / (_| | (__|   < (_| | | | (_) | |_| | | | | (_| |
 * \____/ \__,_|\___|_|\_\__, |_|  \___/ \__,_|_| |_|\__,_|
 *                        __/ |                            
 *                       |___/                             
 *  _____ _ _     _           _                            
 * /  ___| (_)   | |         | |                           
 * \ `--.| |_  __| | ___  ___| |__   _____      __         
 *  `--. \ | |/ _` |/ _ \/ __| '_ \ / _ \ \ /\ / /         
 * /\__/ / | | (_| |  __/\__ \ | | | (_) \ V  V /          
 * \____/|_|_|\__,_|\___||___/_| |_|\___/ \_/\_/           
 *
 * This is a responsive JQuery pluging that creates a background slideshow
 * using JQuery animations.                                                       

 * 
 */
(function($) {
	$.fn.bgSlideShow = function(options) {
		var preloadedImages = new Array();

		var defaultOptions = $.extend({
			// Start with element 0 as default.  Always 0 based.
			current: -1,
			// The list of images
			images: [],
			// Time in ms between the transition from one image to another
			transitionDelay: 5000,
			// The speed of the transition effect
			transitionSpeed: 3000,
			// The effect to use when transitioning (fade-in, from-right, from-left)
			transitionEffect: 'fade-in',
			// Randomize the start element
			randomize: false,
			// If the initial image should also be rendered by this plugin
			// if null - then do not do anything for the first image
			// if a number or 'random' or an image url - then use the appropriate image
			initialBackground: null,
			// Print console.log debug messages for debug purposes
			debug: false,
			// Event handlers for different events
			eventHandlers: {
				// Event before initialization
				beforeInit: null,
				// Event after initialization
				afterInit: null,
				// Event before the existing image is replaced
				beforeChange: null,
				// Event after the existing image is replaced
				afterChange: null
			}
		}, options);

		// Process each element defined by the caller
		return this.each(function(i, el) {
			// Overwrite settings with data- attributes for each
			// element that we are processing.
			var elmtSettings = getSettings(this, defaultOptions);
			// Call the before init event handler
			if (elmtSettings.eventHandlers.beforeInit) {
				elmtSettings.eventHandlers.beforeInit(this, elmtSettings);
			}
			processElement(this, elmtSettings)
			// Call the after init event handler
			if (elmtSettings.eventHandlers.afterInit) {
				elmtSettings.eventHandlers.afterInit(this, elmtSettings);
			}
			debug(elmtSettings.debug, "Done processing element [" + el + "] number [" + i + "]");
		});

		/**
		 * Returns boolean true or false based on the string. If the string is
		 * 'true', 1, yes -> true
		 * otherwise -> false
		 */
		function getBoolean(str, defaultValue) {
			if (str === undefined) {
				return defaultValue;
			}
			if (typeof str === "boolean") {
				return str;
			}
			str = str.trim().toLowerCase();
			return str.startsWith("t") || str.startsWith("y") || str == 1;
		}

		/**
		 * Uses the default options, options from calling the plugin, and any
		 * data- attributes on the element to create the settings.  The
		 * data- elements will have the most preference.
		 */
		function getSettings(elmt, s) {
			var thisSetting = {};
			thisSetting.current = $(elmt).data("current") || s.current || 0;
			thisSetting.images = s.images;
			// Images are comma separated, so we need to split that into arrays
			if ($(elmt).data("images")) {
				thisSetting.images = $(elmt).data("images").split(",").map(item => item.trim());
			}
			thisSetting.initialBackground = $(elmt).data("initialbackground") || s.initialBackground;
			thisSetting.transitionDelay = $(elmt).data("transitionDelay") || s.transitionDelay;
			thisSetting.transitionSpeed = $(elmt).data("transitionspeed") || s.transitionSpeed;
			thisSetting.transitionEffect = $(elmt).data("transitioneffect") || s.transitionEffect;
			thisSetting.randomize = getBoolean($(elmt).data("randomize"), s.randomize);
			thisSetting.debug = getBoolean($(elmt).data("debug"), s.debug);
			thisSetting.eventHandlers = s.eventHandlers;
			// If the element already has a 'display', css tag, then lets keep that insteat
			// of going to block.
			thisSetting.defaultDisplay = $(elmt).css("display") || "block";

			debug(thisSetting.debug, "TransitiontTime [" + thisSetting.transitionDelay + "] transitionSpeed [" + thisSetting.transitionSpeed + "]");
			return thisSetting;
		}

		/**
		 * Print log messages only if debug is turned on by the caller.
		 */
		function debug(v, str) {
			v && console.log(str);
		}

		/**
		 * Based on the options selected by the caller, find the next image and
		 * return the image
		 */
		function getNextImage(settings) {
			/**If the user wanted to randomize, then just pick any from the list of images
			making sure it is not the current one */
			if (settings.randomize) {
				var rand = settings.current;
				while (rand == settings.current) {
					rand = Math.floor(Math.random() * settings.images.length);
				}
				settings.current = rand;
				return settings.images[rand];
			}
			/** If not randomize, then get the next image in the list or recyle */
			if (settings.current >= settings.images.length) {
				settings.current = 0;
			}
			var rval = settings.images[settings.current];
			settings.current = settings.current + 1;
			return rval;
		}

		/**
		 * Process each element that was selected by the caller.  The
	     * timer is set to load the images.
		 */
		function processElement(element, settings) {
			debug(settings.debug, "ProcessShow with element [" + element + "]");
			// Check if we need to set the initial image
			setInitialImage(element, settings);
			// Preload all of the images
			preloadImages(settings.images);
			//var height = $(element).height();
			// Wrap an element around this element with certain
			// css attributes.
			//$(element).wrap("<div class='wrap-bg-element' style='position:relative;height:" + height + "';></div>");
			$(element).wrap("<div class='wrap-bg-element' style='position:relative;';></div>");
			$(element).css("position", "absolute");
			debug(settings.debug, "Setting timeout for element [" + element + "]");
			settings.timerId = setTimeout(timeoutEvent, settings.transitionDelay, element, settings);
		}

		/**
		 * Check to see if the initial background should be set by this code.
		 */
		function setInitialImage(element, settings) {
			if (!settings.initialBackground) {
				return;
			}
			debug(settings.debug, "Setting initial image");
			var initialImage = settings.initialBackground;
			var image = "";
			// If this is a number then use the number
			if (!isNaN(initialImage) && initialImage < settings.images.length) {
				image = settings.images[initialImage];
				settings.current = initialImage + 1;
			} else if (initialImage.toLowerCase() == "random") {
				var originalRandom = settings.randomize;
				settings.randomize = true;
				image = getNextImage(settings);
				settings.randomize = originalRandom;
			} else {
				image = settings.initialBackground;
			}
			$(element).css("background-image", "url(" + image + ")");
		}

		/**
		 * The timeout event is called based on the transition time set by
		 * the caller.  This will continually call itself once the background
		 * image is set on the element.
		 */
		function timeoutEvent(element, settings) {
			debug(settings.debug, "Calling timer for element [" + element + "]");
			var nextImage = getNextImage(settings);
			debug(settings.debug, "Next image is [" + nextImage + "]");
			if (settings.eventHandlers.beforeChange) {
				settings.eventHandlers.beforeChange(element, settings, nextImage);
			}
			settings.cloned = $(element).clone();
			$(settings.cloned).addClass("cloned").css({
				"z-index": -100,
				//				"position": "relative",
				"display": "none",
				"background-image": "url(" + nextImage + ")"
			}).insertAfter($(element));
			$(settings.cloned).css("display", settings.defaultDisplay);
			debug(settings.debug, "Before element fadeout");
			$(element).stop().fadeOut(settings.transitionSpeed, function() {
				debug(settings.debug, "Fading out is done - should remove cloned element");
				$(this).css({
					"background-image": "url(" + nextImage + ")",
					"position": "absolute",
					"display": settings.defaultDisplay
				});
				var removed = $(settings.cloned).remove();
				debug(settings.debug, "Total removed [" + removed.length + "]");
				if (settings.eventHandlers.afterChange) {
					settings.eventHandlers.afterChange(element, settings, nextImage);
				}
				settings.timerId = setTimeout(timeoutEvent, settings.transitionDelay, element, settings);
			});
		}

		/**
		 * Preload all of the images so that there will be no delay in showing
		 * the background.
		 */
		function preloadImages(images) {
			for (i = 0; i < images.length; i++) {
				var length = preloadImages.length;
				preloadedImages[length] = new Image();
				preloadedImages[length].src = images[i];
			}
		}
	};
}(jQuery));