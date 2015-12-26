(function($){
describe('A viewport', function(){
	before(view);

	it('should be created', function(){
		expect($('div#emu .view').length).to.above(0);
	})

	it('should contain an iframe', function(){
		expect($('div#emu .view').find('iframe').length).to.above(0);
	});

	it('should contain an utils bar', function(){
		expect($('div#emu .view').find('div.utils').length).to.above(0);
	});

	it('should have an utils#rotate button', function(done){
		$('div#emu .view').find('div.utils').find('button').each(function(index, el) {
			if(el.innerHTML === 'rotate')
				done();
		});
	});

	it('should have an utils#screenshot button', function(done){
		$('div#emu .view').find('div.utils').find('button').each(function(index, el) {
			if(el.innerHTML === 'screenshot')
				done();
		});
	});

	it('can request a screenshot', function(done){
		$('div#emu .view').find('div.utils').find('button').each(function(index, el) {
			if(el.innerHTML === 'screenshot'){
				el.click();

				if($('iframe')[0].src.indexOf('?screenshot') > -1){
					done();
				}
			}
		});
	});

	after(function(){
		$('#emu').hide();
	});
});
})(jQuery);