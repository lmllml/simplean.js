describe('Simplean Instance', function () {
    var dom = document.querySelector('#test');
    var s1 = Simplean(dom);
    var s2 = Simplean(dom);
    
    it('should have public api to, addClass and removeClass', function () {
        s1.should.have.property('to');
        s1.should.have.property('addClass');
        s1.should.have.property('removeClass');
        s2.should.have.property('to');
        s2.should.have.property('addClass');
        s2.should.have.property('removeClass');
    });

    it('should have private api _setClass, _start, _step', function () {
        s1.should.have.property('_setClass');
        s1.should.have.property('_start');
        s1.should.have.property('_step'); 
        s2.should.have.property('_setClass');
        s2.should.have.property('_start');
        s2.should.have.property('_step'); 
    });
    
    it('should get same instance when init simplean with same dom', function () {
        s1.should.be.exactly(s2);
    });

    describe('#to()', function () {
        it('should assign width, height, backgroundColor, color', function (done) {
            s1.to({
                width: '200px'
            }, {
                duration: 0,
                onStop: function () {
                    dom.style.width.should.be.exactly('200px');
                }
            }).to({
                height: '200px'
            }, {
                duration: 0,
                onStop: function () {
                    dom.style.height.should.be.exactly('200px');                    
                }
            }).to({
                backgroundColor: 'red'
            }, {
                duration: 0,
                onStop: function () {
                    dom.style.backgroundColor.should.be.exactly('red');
                    done();
                }
            }).to({
                color: 'blue'
            }, {
                duration: 0,
                onStop: function () {
                    dom.style.color.should.be.exactly('blue');
                    done();
                }
            });
        });
    });

    describe('#addClass()', function () {

    });

    describe('#removeClass()', function () {
        
    });
});