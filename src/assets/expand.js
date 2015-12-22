var expand = (function($, mbox, container){ // jshint ignore:line
	var _ex, screenshots;

	var ret = function(){
		if(typeof html2canvas === 'undefined'){
			return;
		}

		if(!_ex){
			var utils = $('<div/>').addClass('utils');

			$('<span/>').text('Screenshots').addClass('active').appendTo(utils);

			screenshots = $('<div/>').addClass('screenshots')[0];

			$('<div/>').addClass('emu expand').append(utils).append(screenshots).appendTo(container());

			mbox.receive('screenshot', function(data){
				ret.addScreenShot(data);
			});
		}

		return _ex;
	};

	ret.addScreenShot = function(data){
		$('<img/>', {src : data}).appendTo(screenshots);
	};

	return ret;

})($, mbox, container); // jshint ignore:line
//