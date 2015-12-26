/** Simulate print screen function */
var printscr = (function(msg){ // jshint ignore:line
	return function(element){
		if(typeof html2canvas !== 'undefined'){
			html2canvas(element, {
				onrendered : function(canvas){
					var resultCanvas = document.createElement('canvas');
					resultCanvas.width = canvas.width;
					resultCanvas.height= canvas.height;

					var ctx = resultCanvas.getContext('2d');
					ctx.rect(0, 0, resultCanvas.width, resultCanvas.height);
					ctx.fillStyle = 'white';
					ctx.fill();

					ctx.drawImage(canvas, 0, 0);

					msg.push('screenshot', {
						src : resultCanvas.toDataURL(),
						size: {
							width : element.offsetWidth,
							height: element.offsetHeight
						}
					});
				}
			});
		}
	};
})(msg); // jshint ignore:line
//