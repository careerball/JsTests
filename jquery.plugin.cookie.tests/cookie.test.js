(function(){
	"use strict";
	
	module('cookie.js tests');

	test('set new cookie', function(){
		cookie.set('testName','testValue');
		
		cookie.set('testN', 'testV');
		
		return equal(document.cookie, 'testName=testValue; testN=testV');
	});

	test('get a value of an empty string', function(){
		return equal(cookie.get(), false);
	});

	test('get a value of a cookie (exists)', function(){
		return equal(cookie.get('testN'), 'testV');
	});

	test('get a value of a cookie (non-exists)', function(){
		return equal(cookie.get('testNot'), false);
	});

	test('get the names of the cookies', function(){
		var test = ['testName', 'testN'];
		
		return (equal(cookie.names()[0], test[0]) && equal(cookie.names()[1], test[1]));
	});

	test('show the cookies 1st', function(){
		return equal(cookie.show(), 'testName=testValue; testN=testV');
	});

	test('show the cookies 2st', function(){
		return equal(cookie.show(), document.cookie);
	});

	test('try to delete an empty string', function(){
		return equal(cookie.del(), false);
	});

	test('try to delete a non-exists cookie', function(){
		return equal(cookie.del('testNN'), false);
	});

	test('delete a cookie (exists)', function(){
		cookie.del('testN');
		
		return equal(document.cookie, 'testName=testValue');
	});

	test('flush', function(){
		cookie.flush();
		
		return equal(document.cookie, '');
	});

	test('show the cookies after a flush', function(){
		return equal(cookie.show(), '');
	});

	var t1, t2;
	
	function check1(){
		clearInterval(t1);
		
		test('live cookie', function(){
			return equal(document.cookie, 'name=value');
		});
	}

	function check2(){
		clearInterval(t2);
		
		test('expired cookie', function(){
			return equal(document.cookie, '');
		});
	}

	function start(){		
		clearInterval(t1);
		
		cookie.set('name','value', 0.03125);
		
		t1 = setInterval(check1, 500);
		
		t2 = setInterval(check2, 2000);
	}

	t1 = setInterval(start, 2000);
}).call(this);
