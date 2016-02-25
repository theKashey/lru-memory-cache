'use strict';

/**
 * Provides in-memory cache.
 *
 * @name MemoryCache
 * @constructor
 */
function MemoryCache() {
    this._cache = createMap();
    this._timeOut = 0;
}

/**
 * Returns cache value for the specified key.
 *
 * @param {String} key
 * @returns {*} Value or `undefined` if value does not exist.
 */
MemoryCache.prototype.get = function (key) {
    var line = this._cache[key];
    if (!line) {
        return line;
    } else {
        line.lastUsed = getTime();
        return line.value;
    }
};

/**
 * Assigns value for the specified key.
 *
 * @param {String} key
 * @param {*} value
 * @param {Number} expireTime=0 The length of time in seconds. Then this time passed from last element access, the
 *      value will be automatically deleted. 0 means that time never expire.
 */
MemoryCache.prototype.set = function (key, value, expireTime) {
    this._cache[key] = {
        value: value,
        lastUsed: getTime(),
        expireTime: expireTime * 1000 || 0
    };
    this._triggerExpire();
};

/**
 * Deletes value for the specified key.
 *
 * @param {String} key
 */
MemoryCache.prototype.delete = function (key) {
    delete this._cache[key];
};

/**
 * Clears the whole cache storage.
 */
MemoryCache.prototype.clear = function () {
    this._cache = createMap();
};

MemoryCache.prototype._triggerExpire = function () {
    if (!this._timeOut) {
        this._timeOut = setTimeout(this._burn.bind(this), 1000);
    }
};

MemoryCache.prototype._burn = function () {
    var hasTimes = 0;
    var now = getTime();
    this._timeOut = 0;
    for (var key in this._cache) {
        var line = this._cache[key];
        if (line.expireTime) {
            if (line.lastUsed + line.expireTime <= now) {
                delete this._cache[key];
            } else {
                hasTimes++;
            }
        }
    }
    if (hasTimes) {
        this._triggerExpire();
    }
};

/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 *
 * @returns {Object}
 */
function createMap() {
    return Object.create(null);
}

function getTime() {
    return Date.now();
}

module.exports = MemoryCache;
