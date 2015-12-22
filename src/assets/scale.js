/**
 * Scale an element by ratio, IE9+
 * @param  {HTMLElement} element
 * @param  {integer} ratio
 * @todo Add support to IE8- (??)
 */
var scale = function(element, ratio){ // jshint ignore:line
	element.css({
		'-webkit-transform' : 'scale(' + ratio + ')', // Chrome, Opera 15+, Safari 3.1+
		'-ms-transform'		: 'scale(' + ratio + ')', // IE 9
		transform 			: 'scale(' + ratio + ')' // Firefox 16+, IE 10+, Opera
	});

	return element;
};