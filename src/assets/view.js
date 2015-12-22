var view = (function($, center, scale, container){ // jshint ignore:line
	var _frame, _body;

	var ret = function(){
		_frame = $('<iframe/>', {
			src : window.location.href
		})[0];

		_body = $('<div/>').addClass('emu body').append(_frame)[0];

		var utils = $('<div/>').addClass('utils').appendTo(_body);

		if(typeof html2canvas === 'undefined'){
			$(_body).css({
				right : '10px'
			});
		}
		else{
			$('<button/>').text('screenshot').click(function(){
				_frame.src = _frame.src + '?screenshot=true';
			}).appendTo(utils);
		}

		$('<button/>').text('rotate').click(function(){
			ret.rotate();
		}).appendTo(utils);

		$(_body).appendTo(container());
		center($(_frame));
	};

	ret.set = function(size){
		var parsed = size.split('x'),
			width  = parseInt(parsed[0], 10),
			height = parseInt(parsed[1], 10),
			ratio  = width / height,
			scaledWidth = width,
			scaledHeight = height;

		// calculate scale ratio with padding 40px
		if(height > _body.offsetHeight - 40){
			scaledHeight = _body.offsetHeight - 40;
			scaledWidth = ratio * scaledHeight;
		}

		if(scaledWidth > _body.offsetWidth - 40){
			scaledWidth = _body.offsetWidth - 40;
			scaledHeight = scaledWidth / ratio;
		}

		var scaleRatio = Math.round((scaledWidth / width + 0.00001) * 100) / 100;

		center(
			scale(
				// apply width and height
				$(_frame).css({
					height : height,
					width  : width
				}), scaleRatio)
		);
	};

	ret.rotate = function(){
		ret.set(_frame.offsetHeight + 'x' + _frame.offsetWidth);
	};

	return ret;
})($, center, scale, container); // jshint ignore:line
//