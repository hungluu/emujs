var ctrl = (function($, utils){ // jshint ignore:line
	var ret, opts, installSearchEvents, build, search;

	/**
	 * Install search events for search input
	 * @param  {jQuery} input
	 * @param  {Function} searchFn a function that called every searches
	 */
	installSearchEvents = function(input, searchFn){
		function evt(){
			searchFn(input.val());
		}

		input.on('input', evt);
		input.on('propertychange input', evt);
		input.keyup(function(e) {
			var code = e.code || e.which;
			if (code === 8 || code === 46) { //backspace and delete key
				evt.apply(this);
			}
		});

		return input;
	};

	/**
	 * A simple search event which will toggle elements in a container, IE6+
	 * @param  {String} query
	 * @param  {HTMLElement} container
	 * @param  {String} selector
	 * @return {integer} number of elements found
	 */
	search = function(query, container, selector){
		selector = selector || 'li';

		var found = 0,
			collection = $(container).children(selector);

		if(query !== ''){
			utils.each(collection, function loop(){
				if(this.innerHTML.toLowerCase().indexOf(query.toLowerCase()) > -1){
					// found 1
					found++;

					$(this).show(0);
				}
				else{
					$(this).hide(0);
				}
			});
		}
		else{
			collection.show();
		}
	};

	/**
	 * Build opts list
	 * @param  {Object} options
	 * @param  {String} active custom active indentifier, choose the first one by default
	 */
	build = function(options, active){
		var html = '';

		active = active || utils.first(options);

		for(var x in options){
			html += '<span';

			// check active status
			if(x === active){
				html += ' class=active';
			}

			// add click event
			html += ' onclick=emu("' + x.replace('"', '\\"') + '")>';

			// add text
			html += x.replace(/\_/g, ' ') + '</span>';
		}

		opts.innerHTML = html;
	};

	/**
	 * Install ctrl bar components
	 */
	ret = function(options){
		// options list
		opts = $('<div/>').addClass('opts')[0];

		// search input
		var input = $('<input/>');

		installSearchEvents(input, ret.search);

		build(options);

		// base layer < utils < opts --> #emu
		$('<div/>').addClass('top layer ctrl').append($('<div/>').addClass('utils').append(input)).append(opts).appendTo('#emu');
	};

	ret.search = function(query){
		return search(query, opts, 'span');
	};

	ret.build = build;

	return ret;
})($, utils);