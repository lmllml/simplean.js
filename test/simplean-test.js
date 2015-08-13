var should = chai.should();
describe('Simplean', function () {
    var $dom, simplean;
    beforeEach(function () {
        $dom = $('<div class="#css-test"></div>');
        $('body').append($dom);
        simplean = Simplean($dom[0]);
    });

    afterEach(function () {
        $dom.remove();
    });

    it('should have public api to, addClass and removeClass', function () {
        simplean.should.have.property('to');
        simplean.should.have.property('addClass');
        simplean.should.have.property('removeClass');
    });

    it('should have private api _setClass, _start, _step', function () {
        simplean.should.have.property('_setClass');
        simplean.should.have.property('_start');
        simplean.should.have.property('_step'); 
    });

    it('should be jquery plugin', function () {
        $dom.should.have.property('anTo');
        $dom.should.have.property('anAddClass');
        $dom.should.have.property('anRemoveClass');
    });

    it('should have a alias is window.$A', function () {
        window.$A.should.be.equal(Simplean);
    });

    it('should get same instance when init simplean with same dom', function () {
        var simplean2 = Simplean($dom[0]);
        simplean.should.be.equal(simplean2);
    });

    describe('#to', function () {
        
    });
    
    describe('#addClass', function () {

    });

    describe('#removeClass', function () {

    });
});