(function($){
	"use strict";
	
	$.fn.setCookie = function(name, value, expmin){
		if(typeof(name) === 'string' && typeof(value) === 'string'){
			if(typeof(expmin) === 'number'){
				var now = new Date();

				var exp = now.getTime() + expmin*1000*60;

				now.setTime(exp);

				value += ';expires=' + now.toGMTString() + ';path=/';
			}

			document.cookie = name + '=' + value;
		}
	};

	$.fn.getCookie = function(name){
		var start = document.cookie.indexOf(name + '=');

		if(-1 < start){
			start += name.length + 1;

			var end = document.cookie.indexOf(';', start);

			end = (end < 0) ? document.cookie.length : end;

			return document.cookie.substring(start, end);
		}
		else{
			return false;
		}
	};

	$.fn.getCookieNames = function(){
		var names = document.cookie.replace(';','').split(' ');

		for(var i = 0; i < names.length; i++){
			var end = names[i].indexOf('=');

			names[i] = names[i].substring(0, end);
		}

		return names;
	};

	$.fn.showCookies = function(){
		return document.cookie;
	};

	$.fn.deleteCookie = function(name){
		if(typeof(name) !== 'undefined' && $().getCookie(name) !== false){
			document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

			return true;
		}
		else{
			return false;
		}
	};

	$.fn.flushCookies = function(){
		var names = $().getCookieNames();

		for(var i = 0; i < names.length; i++){
			document.cookie = names[i] + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		}
	};
}(jQuery));
