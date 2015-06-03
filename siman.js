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
		this._dom = document.querySelector(selector); 
	};

	Siman.prototype.animate = function (properties, options) {
		return {
			start: function () {
				this._dom.prefix
			}
		};
	};
})();