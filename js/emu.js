var emu = (function($){ // jshint ignore:line
	'use strict';

	var ret, active, _active, convert, deviceSize;

	// import "assets/list.js"
	// import "assets/utils.js"
	// import "assets/json2.js"
	// import "assets/msg.js"
	// import "assets/printscr.js"
	// USER INTERFACE
	// import "assets/ctrl.js"
	// import "assets/view.js"
	// import "assets/btm.js"


	// convert string to size
	convert = function(sizePair){
		var parsed = sizePair.split('x');
		return {
			width : parseInt(parsed[0], 10),
			height: parseInt(parsed[1], 10)
		};
	};

	// detect device size
	// base on Bootstrap 3 media queries
	deviceSize = function(size){
		if(size.width >= 1200){
			return 'large';
		}
		if(size.width >= 922){
			return 'medium';
		}
		if(size.width >= 768){
			return 'small';
		}
		else{
			return 'extra small';
		}
	};

	active = (function(list){
		_active = utils.first(list);

		return function ret(id){
			_active = id;

			view.resize(convert(_list[_active]));

			ctrl.build(_list, _active);
		};
	})(_list);

	if(utils.isTop){ // detect iframe
		ret = function(id){
			if(id){
				active(id);
				btm.log('Simulating ' + _active.replace(/\_/g, ' ') + '... <u>' + deviceSize(convert(_list[_active])) + '</u> device');
			}
			else{
				$('<div/>', {
					id : 'emu'
				}).appendTo('body');

				ctrl(_list);

				view();

				btm();

				$('<button/>').addClass('emu').text('emu').appendTo(document.body).click(function(){
					$('#emu').fadeToggle('fast', function(){

					});
				});

				// install message boxes
				msg.open('screenshot');
				msg.pull('screenshot', function(data){
					btm.image(_active.replace(/\_/g, ' ') ,data.src, data.size);
				});

				msg.open('log');
				msg.pull('log', function(data){
					btm.log(data);
				});
			}
		};

		$(document).ready(function(){
			// view.resize(_list[_active]);
			active(_active);
			$('#emu').hide();
		});

		$(window).resize(function(){
			view.rescale();
		});
	}
	else{
		ret = function(){
			if(utils.url.param.has('screenshot')){
				$(window).load(function(){
					printscr(document.body);
				});
			}
			else{
				$(window).load(function(){
					msg.push('log', 'Simulation done. Device is ready.');
				});
			}
		};
	}

	// add or re-set a device
	ret.add = function(name, screenSolution){
		_list[name] = screenSolution;
	};

	return ret;
})(jQuery);