;(function () {
	var Utility = (function (){
		return {
			each: function (obj, iterator) {
				if (obj && obj.length) {
					obj.forEach(iterator);	
				} else if (typeof obj === 'object') {
					for (var i in obj) {
						if (obj.hasOwnProperty(i) && iterator(i, obj[i]) === false) {
							return;
						}
					}
				}
			},
			keys: function (obj) {
				var keys = [];
				Utility.each(obj, function (key) {
					keys.push(key);
				});
				return keys;
			},
			css: function (dom, styles) {
				Utility.each(styles, function (property, value) {
					dom.style[property] = value;
				});
			},
			extend: function (obj) {
				var toExtendObjs = [];
				for (var i = 1; i < arguments.length; i ++) {
					toExtendObjs.unshift(arguments[i]);
				}
				Utility.each(toExtendObjs, function (toExtendObj) {
					Utility.each(toExtendObj, function (key, value) {
						obj[key] = value;
					});
				});
				return obj;
			},
			firstUppercase: function (string) {
				return string.replace(/^\w/, function (letter) {
					return letter.toUpperCase();
				});
			},
			compatible: function (styles) {
				var newStyles = {};
				var needCompatible = [
					'transitionDelay', 
					'transitionProperty', 
					'transitionDuration', 
					'transitionTimingFunction',
					'transform'
				];
				Utility.each(styles, function (property, value) {
					if (needCompatible.indexOf(property) > -1 && eventPrefix) {
						newStyles[eventPrefix + Utility.firstUppercase(property)] = value;
					} else {
						newStyles[property] = value;
					}
				});
				return newStyles;
			},
			addEvent: function (dom, eventType, listener, capture) {
				dom.addEventListener(eventType, listener, capture);
			},
			invokeIfExists: function (func, args, context) {
				if (typeof func === 'function') {
					func.apply(context, args);
				}
			}
		};
	})();

	var list = [],
		vendors = ['', 'webkit', 'moz', 'o'],
		cssPrefix = '',
		eventPrefix = '',
		testEl = document.createElement('div');

  	Utility.each(vendors, function(vendor) {
    	if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
			if (vendor) {
				cssPrefix = '-' + vendor + '-';
	          	eventPrefix = vendor;
    		}
    	  	return false;
        }
    });

	var Siman = function (selector) {
		if (!(this instanceof Siman)) {
			return new Siman(selector);
		}
		this._dom = document.querySelector(selector); 
		this._phaseList = [];
	};

	Siman.prototype.animate = function (properties, options) {
		var self = this;
		properties = properties || {};
		options = options || {};

		var styles = Utility.compatible(properties);

		var delay = options.delay ? options.delay + 'ms' : '0';
		var duration = options.duration ? options.duration + 'ms' : '200ms';
		var ease = options.ease || 'linear';

		var transition = Utility.compatible({
			transitionProperty: Utility.keys(properties).join(','),
			transitionDelay: delay,
			transitionDuration: duration,
			transitionTimingFunction: ease
		});

		self._phaseList.push({
			styles: styles,
			transition: transition,
			onStart: options.onStart, 
			onStop: options.onStop
		});
		return self; 
	};
	Siman.prototype.start = function () {
		var self = this;
		var eventType = eventPrefix ? eventPrefix + Utility.firstUppercase('transitionEnd') : 'transitionEnd';
		var throughPhase = function (index) {
			var phase = self._phaseList[index];
			if (phase) {
				Utility.invokeIfExists(phase.onStart);
				Utility.css(self._dom, phase.transition);
				Utility.css(self._dom, phase.styles);	
			}
		};
		throughPhase(0);
		var index = 1;
		Utility.addEvent(self._dom, eventType, function () {
			Utility.invokeIfExists(self._phaseList[index-1].onStop);
			if (index >= self._phaseList.length) {
				return;
			}
			throughPhase(index++);
		});
	};
	window.Siman = Siman;
})();