chai-public-equal 
===========

"publicEqual" object properties matcher for [Chai](http://chaijs.com/) assertion library

Installation
===========

`npm install --save-dev chai-public-equal`

Usage
=====

common.js
```js
var chai = require('chai');
var chaiPublicEqual = require('chai-public-equal');
chai.use(chaiPublicEqual);
```

in your spec.js
```js
var obj = {
	a: 'b',
	c: 'd',
	_d: 'private_value'
};
	
expect(obj).to.eqlPublic({
	a: 'b',
	c: 'd'
});
//or with 'not'
expect(obj).to.not.eqlPublic({
	h: 'b'
});
```
