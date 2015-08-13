'use strict';

var execPromise = require('./execPromise');

execPromise('git push').
    then(function () {
        return execPromise('git push meituan');
    }).
    then(function () {
        return execPromise('mkdocs gh-deploy');
    });