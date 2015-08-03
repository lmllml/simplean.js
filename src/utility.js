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