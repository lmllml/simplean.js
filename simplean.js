;(function () {
	var Map = function () {
		this.keys = [];
		this.values = [];
	};

	Map.prototype.set = function (key, value) {
		this.keys.push(key);
		this.values.push(value);
		return value;
	};

	Map.prototype.get = function (key) {
		var index = -1;
		for (var i = 0; i < this.keys.length; i++) {
			if (this.keys[i] === key) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			return this.values[i];
		}
	};

	Map.prototype.remove = function (key) {
		var index = -1;
		for (var i = 0; i < this.keys.length; i++) {
			if (this.keys[i] === key) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			this.keys.splice(index, 1);
			this.values.splice(index, 1);
		}	
	};

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
			css: function (dom, styles, value) {
				var wrapProperty = function (property) {
					var needCompatible = [
						'transitionDelay', 
						'transitionProperty', 
						'transitionDuration', 
						'transitionTimingFunction',
						'transform'
					];
					if (needCompatible.indexOf(property) > -1 && eventPrefix) {
						property = eventPrefix + Utility.firstUppercase(property);
					}
					return property;
				};

				if (typeof styles === 'object') {
					Utility.each(styles, function (property, value) {
						dom.style[wrapProperty(property)] = value;
					});
				} else if (typeof styles === 'string') {
					if (value !== undefined) {	
						dom.style[wrapProperty(styles)] = value;		
					}
					return dom.style[wrapProperty(styles)];
				}
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
			getComputedStyle: function (dom) {
				return window.getComputedStyle(dom);
			},
			firstUppercase: function (string) {
				return string.replace(/^\w/, function (letter) {
					return letter.toUpperCase();
				});
			},
			addEvent: function (dom, eventType, listener, capture) {
				dom.addEventListener(eventType, listener, capture);
			},
			removeEvent: function (dom, eventType, listener, capture) {
				dom.removeEventListener(eventType, listener, capture);
			},
			diffStyle: function (style1, style2) {
				return ['width', 'height'];
			},
			getTransition: function (properties, options) {
				var delay = options.delay || '0ms';
				var duration = 0;
				if (options.duration !== 0) {
					duration = options.duration || '300ms';
				}
				var ease = options.ease || 'linear';
				if (delay.toString().indexOf('ms') < 0) {
					delay = delay + 'ms';
				}
				if (duration.toString().indexOf('ms') < 0) {
					duration = duration + 'ms';
				}

				return {
					transitionProperty: properties.join(','),
					transitionDelay: delay,
					transitionDuration: duration,
					transitionTimingFunction: ease
				};
			},
			invokeIfExists: function (func, args, context) {
				if (typeof func === 'function') {
					func.apply(context, args);
				}
			},
			relayout: function (dom) {
				Utility.getComputedStyle(dom).width;
			},
		};
	})();

	var list = [],
        vendors = { Webkit: 'webkit', Moz: '', O: 'o' },	
		cssPrefix = '',
		eventPrefix = '',
		testEl = document.createElement('div'),
		simpleanMap = new Map();
  	Utility.each(vendors, function(vendor, event) {
  		if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
          cssPrefix = '-' + vendor.toLowerCase() + '-';
          eventPrefix = event;
          return false;
        }
    });

	var Simplean = function (selector) {
		var dom;
		if (typeof selector === 'string') {
			dom = document.querySelector(selector);
		} else if (typeof selector === 'object') {
			dom = selector;
		} else {
			throw new Error('selector is uncorrect');
		}

		var simplean = simpleanMap.get(dom);
		if (simplean) {
			return simplean;
		} else {
			return simpleanMap.set(dom, new _Simplean(dom));
		}

	};

	Simplean.destroy = function (dom) {
		simpleanMap.remove(dom);
	};

	var _Simplean = function (dom) {
		this._dom = dom;
		this._phaseList = [];
		this._phaseIndex = 0;
		this._status = 'unstart';
	};

	_Simplean.prototype._start = function () {
		if (this._status === 'start') {
			return;
		}
		this._status = 'start';
		var self = this;
		var eventType = eventPrefix ? eventPrefix + Utility.firstUppercase('transitionEnd') : 'transitionend';		

		var throughPhase = function () {
			var phase = self._phaseList[self._phaseIndex];
			if (phase && phase.status === 'unstart') {
				Utility.invokeIfExists(phase.onStart);
				Utility.relayout(self._dom);
				Utility.css(self._dom, phase.transition);
				if (phase.style) {
					Utility.css(self._dom, phase.styles);
				} else if (phase.targetClassName) {
					self._dom.className = phase.targetClassName;
				}
				phase.status = 'start';
				if (phase.transition.transitionDuration === '0ms')	 {
					setTimeout(function () {
						onPhaseEnd();
					}, 0);
				}
			}
		};

		var onPhaseEnd =  function () {
			var phase = self._phaseList[self._phaseIndex];
			if (phase.status === 'stop') {
				return;
			}

			phase.status = 'stop';	
			Utility.css(self._dom, 'transition', '');
			Utility.invokeIfExists(phase.onStop);

			setTimeout(function () {
				self._phaseIndex += 1;
				if (self._phaseIndex >= self._phaseList.length) {
					Utility.removeEvent(self._dom, eventType, onPhaseEnd);
					self._status = 'stop';
					return;
				}
				throughPhase();
			}, 0);
		};

		throughPhase();
		Utility.addEvent(self._dom, eventType, onPhaseEnd);
	};

	_Simplean.prototype.addClass = function (className, options) {
		if (!className) {
			return;
		}
		options = options || {};
		var originClassName = this._dom.className;
		if (originClassName.match('\\b' + className + '\\b')) {
			return;
		}
		var targetClassName = originClassName + ' ' + className; 
		var properties = Utility.diffStyle(this._dom, originClassName, targetClassName);

		this._phaseList.push({
			targetClassName: targetClassName,
			transition: Utility.getTransition(properties, options),
			onStart: options.onStart, 
			onStop: options.onStop,
			status: 'unstart'
		});
		this._start();
		return this;
	};

	_Simplean.prototype.removeClass = function (className, options) {
		if (!className) {
			return;
		}
		options = options || {};
		var originClassName = this._dom.className;
		if (!originClassName.match('\\b' + className + '\\b')) {
			return;
		}

		var targetClassName = originClassName.replace(className, '');
		var properties = Utility.diffStyle(this._dom, originClassName, targetClassName);

		this._phaseList.push({
			targetClassName: targetClassName,
			transition: Utility.getTransition(properties, options),
			onStart: options.onStart, 
			onStop: options.onStop,
			status: 'unstart'
		});
		this._start();
		
		return this;
	};

	_Simplean.prototype.to = function (styles, options) {
		var self = this;
		styles = styles || {};
		options = options || {};

		self._phaseList.push({
			styles: styles,
			transition: Utility.getTransition(Utility.keys(styles), options),
			onStart: options.onStart, 
			onStop: options.onStop,
			status: 'unstart'
		});
		self._start();
		return self; 
	};

	window.Simplean = Simplean;
	if (typeof define !== 'undefined' &&  define.amd) {
		define(function () {
			return Simplean;
		});
	}
})();