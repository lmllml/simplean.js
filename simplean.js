;(function () {
    /**
    * Map
    **/
    var Map = function () {
        this.keys = [];
        this.values = [];
    };  

    /**
    * Map.set
    **/
    Map.prototype.set = function (key, value) {
        this.keys.push(key);
        this.values.push(value);
        return value;
    };

    /**
    * Map.get
    **/
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

    /**
    * Map.remove
    **/
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

    /**
    *   
    */
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

            handleOptions: function (options) {
                options = options || {};
                options.delay = options.delay || '0ms';
                if (options.duration !== 0) {
                    options.duration = options.duration || '300ms';
                }
                options.ease = options.ease || 'linear';

                if (typeof options.delay === 'number') {
                    options.delay += 'ms';
                }
                if (typeof options.duration === 'number') {
                    options.duration += 'ms';
                }
                return options;
            },

            wrapProperty: function (property) {
                 var needCompatible = [
                    'transition',
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
            },

            addCssPrefix: function (property) {
                var needCompatible = [
                    'transition',
                    'transition-delay', 
                    'transition-property', 
                    'transition-duration', 
                    'transition-timing-function',
                    'transform'
                ];
                if (needCompatible.indexOf(property) > -1 && cssPrefix) {
                    property = cssPrefix + property;
                }
                return property;      
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

    var DomUtility = (function () {
        return {
            /**
            * be attention to background-size, max-height 
            * be attention to vertical-align is not number or percentage
            * be attention to top, right, left and bottom is auto 
            **/ 
            diffStyle: function (originDom, targetStyles, noPrefix) {
                var originStyles = Utility.getComputedStyle(originDom);
                var originTransitionProperty = DomUtility.css(originDom, 'transitionProperty');

                var properties = [];
                var needInit = {};
                var needDiffStyles = ['width', 'height', 'padding', 'padding-left', 
                'padding-right', 'padding-top', 'padding-bottom', 'margin', 'margin-left', 
                'margin-right', 'margin-top', 'margin-bottom','lineHeight', 'border-width', 
                'font-size','letter-space', 'word-spacing', 'left', 'right', 'top', 'bottom', 
                'border-radius', 'background-color', 'color', 'border-color', 'opacity', 'transform', 
                'text-shadow', 'box-shadow', 'background-size', 'background', 'background-position', 'border-spacing', 'clip', 
                'max-width', 'max-height', 'min-width', 'min-height', 'outline', 
                'text-indent', 'vertical-align', 'z-index'];

                for (var i = 0; i < needDiffStyles.length; i++) {
                    var property = needDiffStyles[i];
                    var cssProperty = Utility.addCssPrefix(property);
                    var jsProperty = Utility.wrapProperty(property);
                    if (targetStyles[noPrefix ? property : jsProperty] === undefined || 
                        originTransitionProperty.match('(^|\\s)' + cssProperty + ',?\\b')) {
                        continue;
                    } 

                    if (originStyles[jsProperty] !== targetStyles[jsProperty]) {
                        properties.push(cssProperty);
                        if ((jsProperty === 'height' || 
                            jsProperty === 'width' )&& !originDom.style[jsProperty]) {
                            needInit[cssProperty] = originStyles[jsProperty];
                        }
                    }    
                }

                return {
                    properties: properties,
                    needInit: needInit
                };
            },
            /**
            *  Get the difference about styles of two dom.
            */
            diffDom: function (originDom, targetDom) {
                return this.diffStyle(originDom, Utility.getComputedStyle(targetDom));
            },
            /**
            * Get the difference about style after a dom changing class.
            */
            diffClass: function (dom, targetClassName, deep) {
                var self = this;
                var targetTestElem = deep ? dom.cloneNode(true): document.createElement(dom.tagName);
                targetTestElem.style.visibility = 'hidden';
                targetTestElem.className = targetClassName;
                dom.parentNode.appendChild(targetTestElem);
                
                var diffResult = [];
                if (deep) {
                    var stack = [{
                        node: dom,
                        targetNode: targetTestElem 
                    }];
                    while (stack.length) {
                        var item = stack.pop();
                        var result = self.diffDom(item.node, item.targetNode);
                        diffResult.push({
                            elem: item.node,
                            properties: result.properties
                        });

                        var nodeChildren = item.node.children;
                        var targetNodeChildren = item.targetNode.children;

                        for (var i = 0; i < nodeChildren.length; i++) {
                            stack.push({
                                node: nodeChildren[i],
                                targetNode: targetNodeChildren[i]
                            }); 
                        }
                        
                    }
                } else {
                    var result = self.diffDom(dom, targetTestElem);

                    diffResult.push({
                        elem: dom,
                        properties: result.properties,
                        needInit: result.needInit 
                    });
                }

                DomUtility.removeDom(targetTestElem);
                return diffResult;
            },

            css: function (dom, styles, value) {
                if (typeof styles === 'object') {
                    Utility.each(styles, function (property, value) {
                        dom.style[Utility.wrapProperty(property)] = value;
                    });
                } else if (typeof styles === 'string') {
                    if (value !== undefined) {  
                        dom.style[Utility.wrapProperty(styles)] = value;        
                    }
                    return dom.style[Utility.wrapProperty(styles)];
                }
            },

            addTransition: function (dom, properties, options) {
                var transition = '';
                var getValue = function (value, property, defaultValue) {
                    if (typeof value === 'function') {
                        return value(property) || defaultValue;
                    } else {
                        return value || defaultValue;
                    }
                };

                Utility.each(properties, function (property) {
                    // safari中transform必须加前缀
                    property = Utility.addCssPrefix(property);

                    transition += ', ' + property + ' ' + 
                                options.duration + ' ' + 
                                getValue(options.ease, property, 'linear') + ' ' + 
                                options.delay;    
                });

                var currentTransition = dom.style[Utility.wrapProperty('transition')];
                dom.style[Utility.wrapProperty('transition')] += currentTransition ? transition : transition.slice(2); 
            },

            removeTransition: function (dom, properties) {
                var transition = dom.style[Utility.wrapProperty('transition')];
                Utility.each(properties, function (property) {
                    // safari中transform必须加前缀
                    property = Utility.addCssPrefix(property);
                    
                    transition = transition.replace(new RegExp('(^|\\s)' + property + '\\b.*?\\D(,|$)'), '');
                });
                dom.style[Utility.wrapProperty('transition')] = transition.trim(' ');
            },

            // In some android
            removeDom: function (dom) {
                if (typeof dom.remove === 'function') {
                    dom.remove();
                } else {
                    dom.parentNode.removeChild(dom);
                }
            }
        };
    })();

    var list = [],
        vendors = { Webkit: 'webkit', Moz: '', O: 'o' },    
        cssPrefix = '',
        eventPrefix = '',
        testEl = document.createElement('div'),
        simpleanMap = new Map();

    // safari的transform属性必须加webkit前缀(在safari 8.0.4版本的测试结论)
    Utility.each(vendors, function(vendor, event) {
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
          cssPrefix = '-' + vendor.toLowerCase() + '-';
          eventPrefix = event;
          return false;
        }
    });

    var Simplean = function (dom) {
        if (!dom instanceof HTMLElement) {
            throw new Error('Simplean must init by dom');
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

            // get phase
            var phase = self._phaseList[self._phaseIndex];
            if (!phase || phase.status !== 'unstart') {
                self._status ='stop';
                return;
            }
            self._phaseIndex += 1;

            /** 
            * calculate transitionList. If phase.diffClassName is a string, calculate dom target class also.
            */
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

                var diffResult = DomUtility.diffClass(self._dom, targetClassName, phase.options.deep);
                
                phase.transitionList = diffResult.map(function (result) {
                    return {
                        elem: result.elem,
                        properties: result.properties
                    };
                });
                phase.targetClassName = targetClassName;
            } else {
                var diffResult = DomUtility.diffStyle(self._dom, phase.styles, true);
                phase.transitionList = [{
                    elem: self._dom,
                    properties: diffResult.properties,
                    needInit: diffResult.needInit
                }];
            }

            // start one animation
            self._step(phase, function () {
                Utility.invokeIfExists(phase.options.onStart, [self._dom], self);
            }, function () {
                Utility.invokeIfExists(phase.options.onStop, [self._dom], self);
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

            self._dom.addEventListener(eventType, onPhaseEnd);

            Utility.each(phase.transitionList, function (item) {
                if (item.properties.length) {
                    DomUtility.css(item.elem, item.needInit);
                    DomUtility.addTransition(item.elem, item.properties, phase.options);
                }   
            });

            // 保证动画初样式立刻生效
            Utility.relayout(self._dom);

            if (phase.styles) {
                DomUtility.css(self._dom, phase.styles);
            } else if (phase.targetClassName) {
                self._dom.className = phase.targetClassName;
            }

            if (phase.options.duration === '0ms') {
                setTimeout(function () {
                    onPhaseEnd();
                }, 0);
            } else {
                var time = parseInt(phase.options.duration.replace('ms', ''), 10) + parseInt(phase.options.delay.replace('ms', ''), 10);
                setTimeout(function () {
                    if (phase.status !== 'stop') {
                        onPhaseEnd();
                    }
                }, time);
            }
        };
        var onPhaseEnd = function (e) {
            if (phase.status === 'stop') {
                return;
            }
            phase.status = 'stop';  

            Utility.each(phase.transitionList, function (item) {
                DomUtility.removeTransition(item.elem, item.properties);
            });

            self._dom.removeEventListener(eventType, onPhaseEnd);
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

        this._phaseList.push({
            diffClassName: diffClassName,
            options: Utility.handleOptions(options),
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

        self._phaseList.push({
            styles: styles,
            options: Utility.handleOptions(options),
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