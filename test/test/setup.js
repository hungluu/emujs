if('initMochaPhantomJS' in window){
	initMochaPhantomJS();
}

mocha.setup('bdd');
expect = chai.expect;

(function($){
	$(document).ready(function(){
		mocha.run();
	});
})(jQuery);