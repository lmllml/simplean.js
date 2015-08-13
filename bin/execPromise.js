'use strict';

var exec = require('child_process').exec;

module.exports = function execPromise (cmd) {
    return new Promise(function (resolve, reject) {
        console.log(cmd);
        exec(cmd, function (error, stdout) {
            if (error) {
                reject(error);
            }
            console.log('' + stdout);
            resolve(stdout);
        });
    });
};