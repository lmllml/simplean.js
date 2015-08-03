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