var container = (function($){ // jshint ignore:line
	var _container;

	return function(){
		if(!_container){
			_container = $('<div/>').addClass('emu emu-container').appendTo(document.body)[0];
		}

		return _container;
	};
})($);