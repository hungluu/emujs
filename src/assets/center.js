var center = function(element){ // jshint ignore:line
	element.css({
		position : 'absolute',
		top : '50%',
		left : '50%',
		margin : '-' + (element.outerHeight()/2) + 'px 0 0 -' + (element.outerWidth()/2) + 'px'
	});

	return element;
};