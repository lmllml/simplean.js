var should = chai.should();

describe('DomUtility', function () {
    it('should have api diffStyle, diffDom, diffClass, css, addTransition, removeTransition, removeDom', function () {
        DomUtility.should.have.property('diffStyle');
        DomUtility.should.have.property('diffDom');
        DomUtility.should.have.property('diffClass');
        DomUtility.should.have.property('css');
        DomUtility.should.have.property('addTransition');
        DomUtility.should.have.property('removeTransition');
        DomUtility.should.have.property('removeDom');
    });
    describe('#diffStyle', function () {

    });

    describe('#diffDom', function () {
        
    });

    describe('#diffClass', function () {
        
    });

    describe('#css', function () {
        var $dom;
        beforeEach(function () {
            $dom = $('<div class="#css-test"></div>');
            $('body').append($dom);
        });
        afterEach(function () {
            $dom.remove();
        });

        it('when the second argument is object', function () {
            DomUtility.css($dom[0], {
                width: '200px',
                height: '300px',
                background: 'red',
                color: '#000000',
                'font-size': '16px'
            });
            $dom.should.have.css('width', '200px');
            $dom.should.have.css('height', '300px');
            $dom.should.have.css('background-color', 'rgb(255, 0, 0)');
            $dom.should.have.css('color', 'rgb(0, 0, 0)');
            $dom.should.have.css('font-size', '16px');
        }); 

        it('when the second argument is string and the third argument is undefined', function () {
            $dom.css('color', 'red');
            DomUtility.css($dom[0], 'color').should.equal('red');
            $dom.css('color', 'blue');
            DomUtility.css($dom[0], 'color').should.equal('blue');
            DomUtility.css($dom[0], 'background-color').should.equal('');
        });

        it('when the second argument is string and the third argument is string', function () {
            DomUtility.css($dom[0], 'padding-left', '20px');
            $dom.should.have.css('padding-left', '20px');
            DomUtility.css($dom[0], 'font-size', '16px');
            $dom.should.have.css('font-size', '16px');
        });
    });

    describe('#addTransition', function () {
        var $dom;
        beforeEach(function () {
            $dom = $('<div class="#addTransition-test"></div>');
            $('body').append($dom);
        });
        afterEach(function () {
            $dom.remove();
        });
        
        var getValue = function (property) {
            var value = $dom.css(cssPrefix + 'transition-' + property);
            var durationList = value.split(',').map(function (duration) {
                duration = duration.trim().replace('s', '');
                if (duration.length > 5) {
                    duration = duration.slice(0, 5) + 's'; 
                }
                duration = Number(duration);
                return duration + 's';
            });
            return durationList.join(', ');
        };

        it('should add transitionProperty to dom correctly', function () {
            DomUtility.addTransition($dom[0], ['width', 'height'], {
                delay: '0ms',
                duration: '100ms',
                ease: 'linear'
            });

            $dom.should.have.css(cssPrefix + 'transition-property', 'width, height');
            getValue('delay').should.be.equal('0s, 0s');
            getValue('duration').should.be.equal('0.1s, 0.1s');
            $dom.should.have.css(cssPrefix + 'transition-timing-function', 'linear, linear');

            DomUtility.addTransition($dom[0], ['color', 'font-size'], {
                delay: '100ms',
                duration: '200ms',
                ease: 'ease-out'
            });
            $dom.should.have.css(cssPrefix + 'transition-property', 'width, height, color, font-size');
            getValue('delay').should.be.equal('0s, 0s, 0.1s, 0.1s');
            getValue('duration').should.be.equal('0.1s, 0.1s, 0.2s, 0.2s');
            $dom.should.have.css(cssPrefix + 'transition-timing-function', 'linear, linear, ease-out, ease-out');
        });
    });

    describe('#removeTransition', function () {

    });

    describe('#removeDom', function () {
        it('dom can be remove correctly', function () {
            var dom = $('<div class="be-removed"></div>');
            $('body').append(dom);
            $('body').find(dom).should.exist;
            DomUtility.removeDom(dom);
            should.exist(dom);
            $('body').find(dom).should.not.exist;
        });
    });
});