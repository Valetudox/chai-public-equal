# chai-public-equal 

"publicEqual" is an object properties matcher for [Chai](http://chaijs.com/) assertion library

This plugin use https://www.npmjs.com/package/deep-equal to check equality. Before compare it removes the private properties based on the given patterns.
The default pattern is /^_.+/ 

Installation
===========

`npm install --save-dev chai-public-equal`

Usage
=====

```js
var chai = require('chai');
var chaiPublicEqual = require('chai-public-equal');
chai.use(chaiPublicEqual)();
```

Public Equal check
=====
in your spec.js
```js
var obj = {
	a: 'b',
	c: 'd',
	_d: 'private_value',
	e: {
	  f: 1,
	  _g: 2
	}
};
	
expect(obj).to.publicEql({
	a: 'b',
	c: 'd',
	_d: 'other_private_value',
	e: {
	  f: 1,
	  _h: 9
  }	  
});
//or with 'not'
expect(obj).to.not.publicEql({
	h: 'b'
});
```

Contain publics check
=====
in your spec.js
```js
var obj = {
	a: 'b',
	c: 'd',
	_d: 'private_value',
};
	
expect(obj).to.containPublics({
	a: 'b',
	_d: 'other_private_value'
});

//or with 'not'
expect(obj).to.not.containPublics({
	h: 'b'
});
```


Custom patterns for public property name checking
=====

`chai.use(chaiPublicEqual)([/^_.+/, /^should/]);`
 

