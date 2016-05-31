# babel-plugin-transform-for-of-array
for-of statement transformer which only support array or array-like object.

## Difference
es2015 for-of statement support Array, Iterators and Generators.
because Iterators and Generators can't shim easily, we just support Array or Array-like Object.

## Installation

``` sh
$ npm install babel-plugin-transform-for-of-array --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-for-of-array"]
}
```

### Via CLI

```sh
$ babel --plugins transform-for-of-array script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-for-of-array"]
});
```


