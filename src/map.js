/**
* Map
**/
var Map = function () {
    this.keys = [];
    this.values = [];
};  

/**
* Map.set
**/
Map.prototype.set = function (key, value) {
    this.keys.push(key);
    this.values.push(value);
    return value;
};

/**
* Map.get
**/
Map.prototype.get = function (key) {
    var index = -1;
    for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        return this.values[i];
    }
};

/**
* Map.remove
**/
Map.prototype.remove = function (key) {
    var index = -1;
    for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }   
};
