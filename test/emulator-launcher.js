'use strict';

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var consoleport = 5554;
var adbport = 5555;

var emulatorList = [
    'android3',
    'android4', 
    'android5',
    'android6',
    'android7',
    'android9'
    // 'android10',
    // 'android11',
    // 'android12'
];

var cmdList = [];
var index = 0;
var execShell = function (port, cmd, callback) {
    cmd = 'adb -s emulator-' + port + ' wait-for-device shell ' + cmd;
    cmdList.push({
        cmd: cmd,
        status: 'unstart',
        callback: callback
    });

    if (!cmdList[index] || cmdList[index].status !== 'unstart') {
        return;
    }
    

    function shell () {
        var cmdConfig = cmdList[index];
        if (!cmdConfig) {
            return;
        }
        cmdConfig.status = 'start';
        setTimeout(function () {
            exec(cmdConfig.cmd, function () {
                cmdConfig.status = 'stop';
                console.log(cmdConfig.cmd);
                if (cmdConfig.callback) {
                    cmdConfig.callback.apply(null, arguments);
                }
                index ++;
                shell();
            });
        }, 1000);
    }
    shell();
};



var start = function (name) {
    var cport = consoleport;
    var aport = adbport;
    consoleport += 2;
    adbport += 2;

    var getSdkVersion = function (callback) {
        execShell(cport, 'getprop ro.build.version.sdk', function (error, stdout) {
            if (error) {
                console.log('getSdkVersion: ' + error);
            } else {
                callback(parseInt('' + stdout, 10));
            }
        });
    };

    var waitForBooting = function (callback) {
        if (!callback) {
            return;               
        }
        function query() {
            execShell(cport, 'getprop init.svc.bootanim', function (error, stdout) {
                var status = ('' + stdout).replace(/\r|\n/ig, '');
                if (error) {
                    console.log('getSdkVersion: ' + error);
                } else if(status === 'stopped') {
                    callback();
                } else {
                    setTimeout(function () {
                        query();
                    }, 3000);
                }
            }); 
        }
        query();
    };

    var emulator = spawn('emulator', ['-ports', cport + ',' + aport , '-avd', name]);

    emulator.stdout.on('data', function (data) {
        console.log('' + data);
    });

    emulator.stderr.on('data', function (data) {
        console.log('' + data);
    });

    emulator.on('exit', function (code) {
        console.log('' + code);
    });
    waitForBooting(function () {
        getSdkVersion(function (version) {
            console.log(version);
            if (version <= 17) {
                execShell(cport, 'sendevent /dev/input/event0 1 229 1');
            } else {
                execShell(cport, 'input keyevent 82');
            }
           
            execShell(cport, 'am start -a android.intent.action.VIEW -d http://10.0.2.2:9876'); 
        });
    });
};

emulatorList.forEach(function (name) {
    start(name);
});