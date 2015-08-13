/**
* Map
**/
var Map = function () {
    this.keys = [];
    this.values = [];
};  

Map.prototype.indexOf = function (key) {
    var index = -1;
    for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key) {
            index = i;
            break;
        }
    }
    return index;
};

/**
* Map.set
**/
Map.prototype.set = function (key, value) {
    var index = this.indexOf(key);
    if (index >= 0) {
        this.values[index] = value;
    } else {
        this.keys.push(key);
        this.values.push(value);
    }
    return value;
};

/**
* Map.get
**/
Map.prototype.get = function (key) {
    return this.values[this.indexOf(key)];
};

/**
* Map.remove
**/
Map.prototype.remove = function (key) {
    var index = this.indexOf(key);
    if (index >= 0) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }   
};
