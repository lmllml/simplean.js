'use strict';

var exec = require('child_process').exec;
exec('git push | git push meituan');

// var execPromise = require('./execPromise');

// execPromise('git push').
//     then(execPromise('git push meituan')).
//     then(execPromise('mkdocs gh-deploy'));