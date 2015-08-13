module.exports = function (config) {
    config.set({
        basePath: __dirname + '/test/',
        files: [
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/chai/chai.js',
            '../node_modules/chai-jquery/chai-jquery.js',
            '../node_modules/sinon/pkg/sinon.js',
            '../node_modules/sinon-chai/lib/sinon-chai.js',
            '../build/simplean.js',
            'map-test.js',
            'utility-test.js',
            'domUtility-test.js',
            'simplean-test.js'
        ],
        frameworks: ['mocha', 'fixture'],
        browsers: ['Firefox'],
        reporters: ['progress', 'mocha']
    });
};