var should = chai.should();
    expect = chai.expect;

describe('Utility', function () {
    it('should have api each, keys, extend, getComputedStyle,' + 
        'firstUppercase, handleOptions, wrapProperty, addCssPrefix, invokeIfExists, relayout', function () {
        Utility.should.have.property('each');
        Utility.should.have.property('keys');
        Utility.should.have.property('extend');
        Utility.should.have.property('getComputedStyle');
        Utility.should.have.property('firstUppercase');
        Utility.should.have.property('handleOptions');
        Utility.should.have.property('wrapProperty');
        Utility.should.have.property('addCssPrefix');
        Utility.should.have.property('invokeIfExists');
        Utility.should.have.property('relayout');
    });

    describe('#each', function () {
        it('traverse array and the arguments are value, index ', function () {
            var arr = ['aa', 'bb', 'cc', 'dd', 'ee'];
            Utility.each(arr, function (value, index) {
                arr[index].should.to.equal(value);
            });
        });
        it('traverse object and the arguments are key, value', function () {
            var obj = {
                a: '123',
                b: '345',
                c: '789'
            };
            Utility.each(obj, function (key, value) {
                obj[key].should.to.equal(value);
            });
        });
    });

    describe('#keys', function () {
        it('should return correct key array of object', function () {
            var obj = {
                a: 1,
                b: 2,
                c: 3
            };
            var keys = Utility.keys(obj);
            obj.should.have.all.keys('a', 'b', 'c');
            keys.should.have.length(3).and.to.deep.equal(['a', 'b', 'c']);
        });
    });

    describe('#extend', function () {
        it('should return origin object is first argument when the length of arguments is one', function () {
            var obj = {
                a: 5,
                b: 6
            };
            var result = Utility.extend(obj);
            obj.should.to.equal(result).and.to.deep.equal(result);
        });
        it('should return correct extended object', function () {
            var obj = {
                a: 12,
                b: 6
            };
            var toExtend = {
                a: 100,
                c: 1
            };
            var toExtend2 = {
                c: 10,
                d: 10,
                b: 23
            };
            var result = Utility.extend(obj, toExtend, toExtend2);
            obj.should.to.equal(result).and.to.deep.equal(result);
            result.should.to.deep.equal({
                a: 100,
                b: 23,
                c: 10,
                d: 10
            });
        });
    });

    describe('#getComputedStyle', function () {
        it('window has property getComputedStyle', function () {
            should.exist(window.getComputedStyle);
            window.getComputedStyle.should.be.a('function');
        });
    });

    describe('#firstUppercase', function () {
        it('should return Abc when input abc', function () {
            Utility.firstUppercase('abc').should.equal('Abc');
        });
        it('should return ABc when input ABc', function () {
            Utility.firstUppercase('ABc').should.equal('ABc');
        });
        it('should return [space]ABc when input [space]ABc', function () {
            Utility.firstUppercase(' ABc').should.equal(' ABc');
        });
    });

    describe('#handleOptions', function () {
        it('should return default options when no argument', function () {
            var options = Utility.handleOptions();
            options.should.have.all.keys('delay', 'duration', 'ease').
                and.be.deep.equal({
                    delay: '0ms',
                    duration: '300ms',
                    ease: 'linear'
                });
        });
        it('should return correct options when typeof delay and typeof duration are both number', function () {
            var options = Utility.handleOptions({
                delay: 100   
            });
            options.should.have.all.keys('delay', 'duration', 'ease').
                and.be.deep.equal({
                    delay: '100ms',
                    duration: '300ms',
                    ease: 'linear'
                }); 
            var options2 = Utility.handleOptions({
                duration: 500
            });
            options2.should.have.all.keys('delay', 'duration', 'ease').
                and.be.deep.equal({
                    delay: '0ms',
                    duration: '500ms',
                    ease: 'linear'
                }); 

            var options3 = Utility.handleOptions({
                delay: 100,
                duration: 600
            });
            options3.should.have.all.keys('delay', 'duration', 'ease').
                and.be.deep.equal({
                    delay: '100ms',
                    duration: '600ms',
                    ease: 'linear'
                }); 
        });
        it('should return correct ease', function () {
            var options = Utility.handleOptions({
                ease: 'ease-out'
            });
            options.should.have.all.keys('delay', 'duration', 'ease').
                and.be.deep.equal({
                    delay: '0ms',
                    duration: '300ms',
                    ease: 'ease-out'
                }); 
        });
    });

    describe('#wrapProperty', function () {

    });

    describe('#addCssPrefix', function () {

    });

    describe('#invokeIfExists', function () {
        it('should do nothing when first argument is undefined', function () {
            Utility.invokeIfExists();
        });
        it('should invoke first arguments when first argument is function', function () {
            var cb = sinon.spy();
            Utility.invokeIfExists(cb);
            cb.should.have.been.calledOnce;
        });
        it('should invoke function with arguments', function () {
            var cb = sinon.spy();
            var obj = {
                a: 1
            };
            Utility.invokeIfExists(cb, ['abc', obj, 3]);
            cb.should.have.calledOnce.and.been.calledWithExactly('abc', obj, 3);
        });
        it('should invoke function with arguments and context', function () {
            var cb = sinon.spy();
            var obj = {
                a: 12
            };
            Utility.invokeIfExists(cb, [3, 4, 5], obj);
            cb.should.have.been.calledOnce.and.calledWithExactly(3, 4, 5).and.calledOn(obj);
        });
    });

    describe('#relayout', function () {

    });
});