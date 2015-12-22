var mbox = (function(){ // jshint ignore:line
	var _mbox = {};

	var ret = {};

	window.onmessage = function(e){
		if(e.data){
			var parsed = JSON.parse(e.data),
				title  = parsed.title,
				data   = parsed.data;

			if(title in _mbox){
				_mbox[title](data);
			}
		}
	};

	ret.send = function(title, body){
		parent.postMessage(JSON.stringify({
			title : title,
			data  : body
		}), '*');
	};

	ret.receive = function(title, callback){
		_mbox[title] = callback;
	};

	return ret;
})();