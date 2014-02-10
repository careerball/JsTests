(function(){
  "use strict";

	module('jquery.cookie.js tests');

	test('set new cookie', function(){
		$().setCookie('testName','testValue');
		$().setCookie('testN', 'testV');
		return equal(document.cookie, 'testName=testValue; testN=testV');
	});

	test('get a value of an empty string', function(){
		return equal($().getCookie(), '');
	});

	test('get a value of a cookie (exists)', function(){
		return equal($().getCookie('testN'), 'testV');
	});

	test('get a value of a cookie (non-exists)', function(){
		return equal($().getCookie('testNot'), '');
	});

	test('get the names of the cookies', function(){
		var test = ['testName', 'testN'];
		return (equal($().getCookieNames()[0], test[0]) && equal($().getCookieNames()[1], test[1]));
	});

	test('show the cookies 1st', function(){
		return equal($().showCookies(), 'testName=testValue; testN=testV');
	});

	test('show the cookies 2st', function(){
		return equal($().showCookies(), document.cookie);
	});

	test('try to delete an empty string', function(){
		return equal($().deleteCookie(), false);
	});

	test('try to delete a non-exists cookie', function(){
		return equal($().deleteCookie('testNN'), false);
	});

	test('delete a cookie (exists)', function(){
		$().deleteCookie('testN');
		return equal(document.cookie, 'testName=testValue');
	});

	test('flush', function(){
		$().flushCookies();
		return equal(document.cookie, '');
	});

	test('show the cookies after a flush', function(){
		return equal($().showCookies(), '');
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
		$().setCookie('name','value', 0.03125);
		t1 = setInterval(check1, 1000);
		t2 = setInterval(check2, 2000);
	}

	t1 = setInterval(start, 2000);
}).call(this);
