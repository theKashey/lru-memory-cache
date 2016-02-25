# LRU-memory-cache
Simple in-memory cache implementation for Node.js


## Installation

```
npm install --save LRU-memory-cache
```

## Usage example

```js
var MemoryCache = require('LRU-memory-cache');

// Create cache
var cache = new MemoryCache();

// Get/set value
var val = cache.get('key'); // undefined
cache.set('key', 'value', ttl);
val = cache.get('key'); // 'value'

// Delete value
cache.delete('key');
val = cache.get('key'); // undefined

// Set value which will expire after 1 second
cache.set('key', 'new-value', 1);
setTimeout(function () {
    val = cache.get('key'); // undefined
}, 1000);

cache.set('key', 'new-value', 1);
setTimeout(function () {
    val = cache.get('key'); // new-value (exist)
}, 900);

setTimeout(function () {
    val = cache.get('key'); // still exists
}, 900);

// each get move 'used' timestamp further. So TTL means time-from-last-use. LRU cache.


```

## Running tests

```
npm install
npm test
```
