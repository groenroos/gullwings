/**
 *
 * Gullwings v0.0.1
 * Draw curly braces in canvas, by Oskari Groenroos.
 * http://groenroos.fi
 *
 * Free to use under the MIT License.
 * http://opensource.org/licenses/MIT
 *
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('Gullwings', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Gullwings = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings; // Plugin settings

	// Default settings
	var defaults = {
        direction: "left", // left, right, up, down
        thickness: 1, // line thickness
        point: 0.5, // position of point
        color: '#212121', // default color of the brace
        sharpness: 1.5 // corner sharpness
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	exports.destroy = function ( element ) {
        if(element) {
            // destroy specific
            var boxes = (typeof element === "string") ? document.querySelectorAll(element) : element;
            
            forEach(boxes, function(box){
                while(box.firstChild) box.removeChild(box.firstChild);
            });
        } else {
            // destroy all 
            var box = document.querySelectorAll(".gullwings");
            while(box.firstChild) box.removeChild(box.firstChild);
        }
	};

	/**
	 * Initialize Plugin
	 * @public
     * @param String element Query selector string for the element
	 * @param {Object} options User settings
	 */
	exports.init = function ( element, options ) {

		// feature test
		if ( !supports ) return;
        var settings = extend( defaults, options || {} );

		// find elements and go through them
        var boxes = (typeof element === "string") ? document.querySelectorAll(element) : element;
        
        forEach(boxes, function(box){
            // create canvas
            var canvas = document.createElement("canvas");
            
            canvas.setAttribute("width", box.offsetWidth);
            canvas.setAttribute("height", box.offsetHeight);
            canvas.classList.add("gullwings");
            
            box.appendChild(canvas);
            
            // set up canvas environment
            var context = canvas.getContext('2d'),
                devicePixelRatio = window.devicePixelRatio || 1,
                backingStoreRatio = context.webkitBackingStorePixelRatio ||
                                    context.mozBackingStorePixelRatio ||
                                    context.msBackingStorePixelRatio ||
                                    context.oBackingStorePixelRatio ||
                                    context.backingStorePixelRatio || 1,
                ratio = devicePixelRatio / backingStoreRatio;
    
            if (devicePixelRatio !== backingStoreRatio) {
                var oldWidth = canvas.width;
                var oldHeight = canvas.height;
        
                canvas.width = oldWidth * ratio;
                canvas.height = oldHeight * ratio;
        
                canvas.style.width = oldWidth + 'px';
                canvas.style.height = oldHeight + 'px';
        
                context.scale(ratio, ratio);
            }
            
            // make curly brace
            var horizontal = (settings.direction == "up" || settings.direction == "down"),
                length = (horizontal) ? canvas.width / 2 : canvas.height / 2,
                linelength = (length - 60) / 2,
                edge = (horizontal) ? canvas.height / 2 : canvas.width / 2,
                middle = (horizontal) ? canvas.height / 4 : canvas.width / 4;
            
            if(settings.point <= 1) // percentage
                var pointoffset = ((horizontal) ? canvas.width / 2 : canvas.height / 2) * settings.point - 20 - settings.thickness;
            else
                var pointoffset = settings.point - 20 - settings.thickness;
            
            if(settings.direction == "left" || settings.direction == "up")
                var inner = edge, outer = 0;
            else if(settings.direction == "right" || settings.direction == "down")
                var inner = 0, outer = edge;
            
            context.lineWidth = settings.thickness;
            context.strokeStyle = settings.color;
            context.beginPath();
            
            if(settings.direction == "up" || settings.direction == "down") {
                context.moveTo(settings.thickness, inner);
                context.arcTo(settings.thickness, middle, 10 + settings.thickness, middle, middle / settings.sharpness);
                context.lineTo(10 + pointoffset, middle);
                context.arcTo(20 + pointoffset, middle, 20 + pointoffset, outer, middle / settings.sharpness);
                context.arcTo(20 + pointoffset, middle, 30 + pointoffset, middle, middle / settings.sharpness);
                context.lineTo(length - (10 + settings.thickness), middle);
                context.arcTo(length - settings.thickness, middle, length - settings.thickness, inner, middle / settings.sharpness);
                context.lineTo(length - settings.thickness, inner);
            } else {
                context.moveTo(inner, settings.thickness);
                context.arcTo(middle, settings.thickness, middle, 10 + settings.thickness, middle / settings.sharpness);
                context.lineTo(middle, 10 + pointoffset);
                context.arcTo(middle, 20 + pointoffset, outer, 20 + pointoffset, middle / settings.sharpness);
                context.arcTo(middle, 20 + pointoffset, middle, 30 + pointoffset, middle / settings.sharpness);
                context.lineTo(middle, length - (10 + settings.thickness));
                context.arcTo(middle, length - settings.thickness, inner, length - settings.thickness, middle / settings.sharpness);
                context.lineTo(inner, length - settings.thickness);
            }
            
            context.stroke();
            
        });
	};

	return exports;
});