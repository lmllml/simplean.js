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
            // need be attention to background-size, max-height, vertical-align
            diffStyle: function (dom, targetClassName) {
                var targetTestElem = document.createElement(dom.tagName);
                targetTestElem.style.visibility = 'hidden';
                targetTestElem.className = targetClassName;
                dom.parentNode.appendChild(targetTestElem);

                var originStyles = Utility.getComputedStyle(dom);
                var targetStyles = Utility.getComputedStyle(targetTestElem);

                var diff = function () {
                    var properties = [];
                    var needDiffStyles = ['width', 'height', 'padding', 'margin', 
                    'lineHeight', 'border-width', 'font-size','letter-space', 'word-space', 
                    'left', 'right', 'top', 'bottom', 'border-radius', 'background-color', 
                    'color', 'border-color', 'opacity', 'transform', 'text-shadow', 'box-shadow', 
                    'background-size', 'background-position', 'border-spacing', 'clip', 
                    'max-width', 'max-height', 'min-width', 'min-height', 'outline', 
                    'text-indent', 'vertical-align', 'z-index'];
                    
                    for (var i = 0; i < needDiffStyles.length; i++) {
                        if ((needDiffStyles[i] === 'left' ||
                            needDiffStyles[i] === 'right' || 
                            needDiffStyles[i] === 'top' || 
                            needDiffStyles[i] === 'bottom') && originStyles[needDiffStyles[i]] === 'auto') {
                            continue;
                        }

                        if (originStyles[needDiffStyles[i]] !== targetStyles[needDiffStyles[i]]) {
                            properties.push(needDiffStyles[i]);
                        }
                    }

                    targetTestElem.remove();
                    return properties;
                };

                return diff();
            },
            getTransition: function (properties, options) {
                var delay = options.delay || '0ms';
                var duration = 0;
                if (options.duration !== 0) {
                    duration = options.duration || '300ms';
                }
                
                var ease = options.ease || 'linear';
                if (typeof delay === 'number') {
                    delay = delay + 'ms';
                }
                if (typeof duration === 'number') {
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
            }
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

    var Simplean = function (dom) {
        if (!dom instanceof HTMLElement) {
            throw new Error('Simplean must initialize by dom');
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
        var self = this;
        this._status = 'start';
        var start = function () {
            var phase = self._phaseList[self._phaseIndex];
            if (!phase || phase.status !== 'unstart') {
                self._status ='stop';
                return;
            }
            self._phaseIndex += 1;

            if (phase.diffClassName) {
                var originClassName = self._dom.className;
                var targetClassName = originClassName; 

                var classNames = phase.diffClassName.split(' ');
                
                if (classNames[0] === '-') {
                    for (var i = 1; i < classNames.length; i++) {
                        if (self._dom.classList.contains(classNames[i])) {
                            targetClassName = targetClassName.replace(classNames[i], '');
                        }       
                    }
                } else if (classNames[0] === '+') {
                    for (var i = 1; i < classNames.length; i++) {
                        if (!self._dom.classList.contains(classNames[i])) {
                            targetClassName += ' ' + classNames[i];
                        }
                    }
                } 
                if (targetClassName === originClassName) {
                    setTimeout(function () {
                        start();
                    }, 0);
                    return;
                }

                var properties = Utility.diffStyle(self._dom, targetClassName);
                phase.transition = Utility.getTransition(properties, phase.options);
                phase.targetClassName = targetClassName;
            }

            self._step(phase, function () {
                Utility.invokeIfExists(phase.onStart);
            }, function () {
                Utility.invokeIfExists(phase.onStop);
                start();
            });
        };
        start();
    };

    _Simplean.prototype._step = function (phase, onStart, onStop) {
        var self = this;
        var eventType = eventPrefix ? eventPrefix + Utility.firstUppercase('transitionEnd') : 'transitionend';  

        var throughPhase = function () {
            phase.status = 'start';
            Utility.invokeIfExists(onStart);

            Utility.addEvent(self._dom, eventType, onPhaseEnd);

            Utility.relayout(self._dom);
            if (phase.transition.transitionProperty) {
                Utility.css(self._dom, phase.transition);
            }
            if (phase.styles) {
                Utility.css(self._dom, phase.styles);
            } else if (phase.targetClassName) {
                self._dom.className = phase.targetClassName;
            }
            Utility.relayout(self._dom);

            if (phase.transition.transitionDuration === '0ms' || 
                !phase.transition.transitionProperty)    {
                setTimeout(function () {
                    onPhaseEnd();
                }, 0);
            }
        };
        var onPhaseEnd = function () {
            if (phase.status === 'stop') {
                return;
            }
            phase.status = 'stop';  

            Utility.css(self._dom, 'transition', '');
            Utility.removeEvent(self._dom, eventType, onPhaseEnd);
            setTimeout(function () {
                Utility.invokeIfExists(onStop); 
            }, 0);
        };
        throughPhase();
    };

    _Simplean.prototype._setClass = function (diffClassName, options) {
        if (!diffClassName) {
            return;
        }
        options = options || {};

        this._phaseList.push({
            diffClassName: diffClassName,
            options: options,
            onStart: options.onStart, 
            onStop: options.onStop,
            status: 'unstart'
        });
        this._start();
    };

    _Simplean.prototype.addClass = function (className, options) {
        this._setClass('+ ' + className, options);
        return this;
    };

    _Simplean.prototype.removeClass = function (className, options) {
        this._setClass('- ' + className, options);
        return this;
    };

    _Simplean.prototype.to = function (styles, options) {
        var self = this;
        styles = styles || {};
        options = options || {};

        self._phaseList.push({
            styles: styles,
            transition: Utility.getTransition(Utility.keys(styles), options),
            options: options,
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