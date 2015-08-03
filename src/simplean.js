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