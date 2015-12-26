(function($){
describe('Button.emu', function(){
	it('should be visible', function(){
		expect($('button.emu').is(':visible')).to.be.true;
	});
});

describe('Div#emu', function(){
	it('should be hidden', function(){
		expect($('div#emu').is(':visible')).to.be.false;
	});

	it('must be shown when button.emu is clicked', function(){
		$('button.emu')[0].click();
		expect($('div#emu').is(':visible')).to.be.true;
	});

	it('must be hidden when button.emu is clicked again', function(done){
		$('button.emu')[0].click();
		var count = 0;
		var interval = setInterval(function interval(){
			count++;

			if(!$('div#emu').is(':visible')){
				done();
				clearInterval(interval);
			}
			else if(count > 3){
				clearInterval(interval);
			}

		}, 1000);
	});
});
})(jQuery);