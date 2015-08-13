module.exports = function (config) {
    var configuration = {
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
        browsers: ['Chrome'],
        customLaunchers: {
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },
        reporters: ['mocha']
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
};