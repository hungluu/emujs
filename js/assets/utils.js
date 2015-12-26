var utils = (function(){ // jshint ignore:line
	var ret = {},
		merge,
		h,
		w,
		scale,
		first,
		each,
		url,
		param,
		center,
		old = false; // ie8

	if(!document.addEventListener){
		old = true;
	}

	// get parameters
	param = (function(){
		var match,
			pl	 = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			query  = window.location.search.substring(1),
			_params = {},
			ret;

		function decode(s){
			return decodeURIComponent(s.replace(pl, ' '));
		}

		match = search.exec(query);
		while(match){
			_params[decode(match[1])] = decode(match[2]);
			match = search.exec(query);
		}

		ret = function(key){
			if(key){
				return _params[key.toString()];
			}
			else{
				return _params;
			}
		};

		ret.has = function(key){
			return typeof _params[key] !== 'undefined';
		};

		ret.toString = function(){
			var queries = [];

			for(var x in _params){
				if(_params[x] !== undefined){
					if(_params[x] === ''){
						queries.push(encodeURIComponent(x));
					}
					else{
						queries.push(encodeURIComponent(x) + '=' + encodeURIComponent(_params[x]));
					}
				}
			}

			return queries.length ? '?' + queries.join('&') : '';
		};

		ret.with = function(params){
			var newParams = _params;

			for(var x in params){
				newParams[x] = params[x];
			}

			return newParams;
		};

		ret.rem = function(key){
			_params[key] = undefined;
		};

		ret.add = function(key, value){
			_params[key] = value;
		};

		return ret;
	})();


	// URL
	url = (function(){
		function URLEntity(){
			this.url = [location.protocol, '//', location.host, location.pathname].join('');
			this.param = param;
			this.full = window.location.href;
		}

		URLEntity.prototype = {
			toString : function(){
				return this.url;
			},
			to : function(url){
				window.location.href = url;
			},
			// get referrer
			previous : function(){
				return window.referrer;
			},
			encode : function(input){
				return encodeURIComponent(input);
			},
			decode : function(input){
				return decodeURIComponent(input);
			},
			// open an url in new tab/window
			open : function(url){
				var link = document.createElement('a');
				link.href = url;
				link.target = '_blank';
				link.click();
			},
			with : function(params){
				var queries = [];

				for(var x in params){
					if(params[x] !== undefined){
						if(params[x] === ''){
							queries.push(this.encode(x));
						}
						else{
							queries.push(this.encode(x) + '=' + this.encode(params[x]));
						}
					}
				}

				return queries.length ? this.url + '?' + queries.join('&') : this.url;
			}
		};

		return new URLEntity();
	})();

	merge = function(obj, custom){
		for(var x in custom){
			obj[x] = custom[x];
		}
	};

	// get real height
	h = function(element){
		return element.offsetHeight;
	};

	// get real width
	w = function(element){
		return element.offsetWidth;
	};

	// loop
	each = function(collection, callback){
		for(var i = collection.length - 1; i >= 0; i--){
			callback.apply(collection[i]);
		}
	};

	// modern browsers
	if(!old){
		/**
		 * Scale an element
		 * @param  {HTMLElement} element
		 * @param  {number} ratio
		 */
		scale = function(element, ratio){
			var css = 'scale(' + ratio + ')';

			merge(element.style, {
				'-moz-transform':    css,
				'-o-transform':      css,
				'-webkit-transform': css,
				'transform':         css
			});
		};
	}
	else{
		scale = function(element, ratio){
			var css = '"progid:DXImageTransform.Microsoft.Matrix(M11=' + ratio + ', M12=0, M21=0, M22=' + ratio + ', SizingMethod=\'auto expand\')"';

			merge(element.style, {
				'-ms-filter':  css, // ie8
				'filter': 	   css, // ie7-
				'margin-left': '-' + w(element) + 'px',
				'margin-top' : '-' + h(element) + 'px'
			});
		};
	}

	/**
	 * Get first key of items in object
	 * @param  {Object} collection
	 * @return {String}
	 */
	first = function(collection){
		for(var x in collection){
			return x;
		}
	};

	/**
	 * Center an element
	 * @param  {HTMLElement} element
	 */
	center = function(element){
		merge(element.style, {
			position : 'absolute',
			top : '50%',
			left : '50%',
			margin : '-' + (element.offsetHeight/2) + 'px 0 0 -' + (element.offsetWidth/2) + 'px'
		});
	};


	// Install functionality
	ret.each  = each;
	ret.scale = scale;
	ret.center= center;
	ret.first = first;
	ret.url   =	url;
	ret.isTop = window === window.top; // detect iframe
	ret.isDev = navigator.plugins.length === 0; // detect phantomJS

	return ret;
})();