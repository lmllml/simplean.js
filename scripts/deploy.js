'use strict';

var exec = require('child_process').exec;

var execPromise = function (cmd) {
    return function () {
        return new Promise(function (resolve, reject) {
            console.log(cmd);
            exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    return reject(error);
                }
                console.log('' + stdout);
                console.log('' + stderr);
                return resolve({
                    stdout: stdout,
                    stderr: stderr
                });
            });
        });
    };
};
Promise.resolve().
    then(execPromise('gulp deploy')).
    then(execPromise('npm run test')).
    then(execPromise('git push')).
    then(execPromise('git push meituan'));