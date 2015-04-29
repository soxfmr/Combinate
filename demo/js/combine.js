(function($) {
	/** The object which has store the status of the previous page of the elements */
	var prevStatus = undefined;
	
	/** The table of all animations */
	var animTable = new Array();
	
	/** The table of all styles */
	var styleTable = new Array();
	
	/** Play the animation using the jQuery.Transit through the array or object */
	var transitAnim = function(instance, effects) {
		if(effects instanceof Array) {
			$.each(effects, function(index, element) {
				instance = instance.transit(element);
			});
		}else {
			return instance.transit(effects);
		}
	};
	
	/** Initial the styles and the animations of the element which in the selector wrapper 
	 * 
	 * @param styles The styles list of the elements
	 * @param anims The animations list of the elements
	 */
	$.fn.combine = function(styles, anims) {
		var name = this.selector;
		
		// Append the extra of style to the style list
		$.each(styles, function() {
			$.extend(this, { 'position' : 'absolute' });
		});
		// Store the animations of the elements
		animTable[name] = anims;
		// Store the styles of the elements
		styleTable[name] = styles;
		
		return this.each(function() {
			$(this).children().each(function(index, element) {
				$(this).css(styles[index]);
			});
		});
	};
	
	/**
	 * Appending the element to the container and play the animation
	 *
	 * @param container The selector which including the wrapper and all of elements
	 * @param delay The animation will be delay when this argument has specified
	 */
	$.fn.runAnim = function(container, delay) {
		var name = this.selector;

		if($(container).children().length <= 0 && prevStatus !== undefined) {
			$(container).append(prevStatus);
		}
		
		setTimeout(function() {
			$(name).children().each(function(index, element) {
				// $(this).transit(animTable[name][index]);
				transitAnim($(this), animTable[name][index]);
			});
		}, delay);
	};

	/**
	 * Droping the wrapper and all of elements after the page left.
	 * 
	 * @param container The selector which including the wrapper and all of elements
	 */
	$.fn.drop = function(container) {
		var name = this.selector;
		
		return this.each(function() {
			// Reset the styles of the element
			$(this).children().each(function(index) {
				$(this).attr('style', '');
				$(this).css(styleTable[name][index]);
			});
			// Store the status of previous page
			prevStatus = $(this).clone();
			$(container).empty();
		});
	}
})(jQuery);