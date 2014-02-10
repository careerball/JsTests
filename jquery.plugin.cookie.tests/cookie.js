var cookie = {	
	/**
	*	Set a new cookie.
	*	@name string Name of the new cookie.
	*	@value string Value of the new cookie.
	*	@expires number Date of expire of the new cookie.
	*/
	set: function(name, value, expmin){
		"use strict";
		
		if(typeof(name) === 'string' && typeof(value) === 'string'){
			if(typeof(expmin) !== 'undefined'){
				var now = new Date();

				var time = now.getTime();
				
				var exp = time + expmin*1000*60;
				
				now.setTime(exp);

				value += ";expires="+now.toGMTString()+';path=/';
			}

			document.cookie = name + '=' + value;
		}
	},
	
	/**
	*	Get a value of a cookie.
	*	@name string Name of the cookie.
	*	return: string of the value
	*/
	get: function(name){
		"use stirct";
		
		var start = document.cookie.indexOf(name+'=');

		if(-1 < start){
			start += name.length+1;

			var end = document.cookie.indexOf(';', start);
			
			end = (end < 0) ? document.cookie.length : end;

			return document.cookie.substring(start, end);
		}
		else{
			return false;
		}
	},

	/**
	*	Give back the names of the cookies
	*	return: object of names
	*/
	names: function(){
		"use strict";
		
		var names = document.cookie.replace(';','').split(' ');

		for(var i=0; i<names.length; i++){
			var end = names[i].indexOf('=');
		
			names[i] = names[i].substring(0, end);
		}

		return names;
	},
	
	/**
	*	Show all of the cookies
	*/
	show: function(){
		"use strict";
		
		return document.cookie;
	},

	/**
	*	Delete a cookie
	*	@name string Name of the cookie.
	*	return: if deleted => true, else => false
	*/
	del: function(name){
		"use strict";
		
		if(typeof(name) !== 'undefined' && cookie.get(name) !== false){
			document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
			
			return true;
		}
		else{
			return false;
		}
	},
	
	/**
	*	Delete all of the cookies
	*/
	flush: function(){
		"use strict";
		
		var names = cookie.names();
		
		for(var i=0; i<names.length; i++){
			document.cookie = names[i] + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		}
	}
};
