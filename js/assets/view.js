var view = (function($, utils){ // jshint ignore:line
	var ret,
		// an iframe
		viewport,
		rotate,
		screenshot,
		refresh,
		resize,
		rescale;

	/**
	 * Resize the viewport
	 * @param  {Object} size {width, height}
	 */
	resize  = function(size){
		var width  = size.width,
			height = size.height,
			ratio  = width / height,
			scaledWidth = width,
			scaledHeight = height,
			body   = $('#emu .view')[0];

		// calculate scale ratio with padding 40px
		if(height > body.offsetHeight - 40){
			scaledHeight = body.offsetHeight - 40;
			scaledWidth = ratio * scaledHeight;
		}

		if(scaledWidth > body.offsetWidth - 40){
			scaledWidth = body.offsetWidth - 40;
			scaledHeight = scaledWidth / ratio;
		}

		var scaleRatio = Math.round((scaledWidth / width + 0.00001) * 100) / 100;

		// apply width and height then scale, center
		$(viewport).css({
			height : height,
			width  : width
		});

		utils.scale(viewport, scaleRatio);
		utils.center(viewport);
	};

	/** Refresh the viewport */
	refresh = function(){
		viewport.src = utils.url;
	};

	/** Rotate the viewport */
	rotate = function(){
		resize({
			width : viewport.offsetHeight,
			height: viewport.offsetWidth
		});
	};

	rescale= function(){
		resize({
			width : viewport.offsetWidth,
			height: viewport.offsetHeight
		});
	};

	/** Request a screenshot from viewport */
	screenshot = function(){
		viewport.src = utils.url.with({'screenshot' : ''});
	};

	/** Install viewport components */
	ret = function(){
		// rotate button
		var rotatebtn = $('<button/>').text('rotate').click(rotate);
		// screenshot button
		var scshotbtn = $('<button/>').text('screenshot').click(screenshot);
		// iframe
		viewport = $('<iframe/>', {
			src : utils.url
		})[0];

		// layer < utils[screenshot, rotate] < viewport --> #emu
		$('<div/>').addClass('top layer view').append($('<div/>').addClass('utils').append(scshotbtn).append(rotatebtn)).append(viewport).appendTo('#emu');
	};

	ret.resize = resize;

	ret.rotate = rotate;

	ret.refresh= refresh;

	ret.rescale= rescale;

	return ret;

})($, utils);