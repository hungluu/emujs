var bar = (function($, container){ // jshint ignore:line
	var _bar;

	var ret = function(){
		// bar
		_bar = $('<div/>').addClass('emu bar').appendTo(container())[0];

		// search input
		var searchInput = $('<input/>')[0];

		function installSearchEvent(input){
			function ev(){
				ret.search(input.value.toLowerCase());
			}

			$(input).on('input', ev);
			$(input).on('propertychange input', ev);
			$(input).keyup(function(e) {
				var code = e.code || e.which;
				if (code === 8 || code === 46) { //backspace and delete key
					ev();
				}
			});
		}

		installSearchEvent(searchInput);

		// search box
		$('<div/>').addClass('emu search').appendTo(container()).append(searchInput);
	};

	ret.search = function(query){
		var search = $('div.emu.bar').children('div');

		if(query !== ''){
			for(var i = search.length - 1; i >= 0; i--){
				var jq = $(search[i]);
				if(jq.children('span')[0].innerHTML.toLowerCase().indexOf(query) > -1){
					jq.show();
				}
				else{
					jq.hide();
				}
			}
		}
		else{
			search.show();
		}
	};

	/**
	 * Build bar contents
	 * @param  {Object} list
	 * @param  {String} active key that is being used
	 */
	ret.list = function(list, active){
		var html = '';

		// reset bar
		$(_bar).html(html);

		for(var x in list){
			html += '<div><span';
			if(x === active){
				html += ' class=active';
			}

			html += ' onclick=emu("' + x + '")>';

			html += x.replace(/\_/g, ' ') + '</span></div>';
		}

		$(_bar).html(html);
	};

	return ret;
})($, container); // jshint ignore:line
//