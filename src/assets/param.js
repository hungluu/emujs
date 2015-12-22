var param = (function(){ // jshint ignore:line
	var match,
		pl	 = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		query  = window.location.search.substring(1),
		_params = {};

	function decode(s){
		return decodeURIComponent(s.replace(pl, ' '));
	}

	match = search.exec(query);
	while(match){
	   _params[decode(match[1])] = decode(match[2]);
	   match = search.exec(query);
	}

   	return function(key){
		if(key){
			return _params[key.toString()];
		}
		else{
			return _params;
		}
	};

})();