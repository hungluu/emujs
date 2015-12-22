var screenshot = (function(mbox){ // jshint ignore:line
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

					mbox.send('screenshot', resultCanvas.toDataURL());
				}
			});
		}
	};
})(mbox); // jshint ignore:line
//