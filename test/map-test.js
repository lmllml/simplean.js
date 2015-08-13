var should = chai.should(),
    expect = chai.expect;
describe('Map', function () {
    var map = new Map();
    var obj = {a: 1};
    it('should have api set, get and remove', function () {
        map.should.have.property('set');
        map.should.have.property('get');
        map.should.have.property('remove');
    });

    it('key is exclusive', function () {
        map.set('a', 1);
        expect(map.get('a')).to.equal(1);
        map.set('a', 2);
        expect(map.get('a')).to.equal(2);
        map.set(obj, '1');
        expect(map.get(obj)).to.equal('1');
        map.set(obj, '2');
        expect(map.get(obj)).to.equal('2');
    });
    it('remove obj', function () {
        expect(map.get(obj)).to.exist;
        map.remove(obj);
        expect(map.get(obj)).to.not.exist;
        
    });
    it('indexOf', function () {
        map.set(obj, '2');
        map.set('c', 3);
        expect(map.indexOf('a')).to.equal(0);
        expect(map.indexOf(obj)).to.equal(1);
        expect(map.indexOf('c')).to.equal(2);
    });
});