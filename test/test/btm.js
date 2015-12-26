(function($){
describe('A btm layer', function(){
	before(btm);

	it('should be created', function(){
		expect($('div#emu .btm').length).to.above(0);
	});

	it('should be a btm layer', function(){
		var e = $('div#emu .btm');

		expect(e.hasClass('btm')).to.be.true;
		expect(e.hasClass('layer')).to.be.true;
	});

	it('should contain 2 utils button', function(){
		expect($('div#emu .btm .utils').children('span').length).to.equal(2);
	});

	it('should have #images tab active by default', function(done){
		$('div#emu .btm .utils').children('span').each(function(index, el) {
			if( $(el).text() === 'Images'
				&& $(el).hasClass('active')
				&& $('div#emu .btm .images').is(':visible')
				&& !$('div#emu .btm .logs').is(':visible')){
				done();
			}
		});
	});
});

describe('A btm#console', function(){
	it('can be logged', function(){
		btm.log('a');
		expect($('div#emu .btm .logs').children('p').length).to.above(0);
	});

	it('trigger count when not active', function(done){
		$('div#emu .btm .utils').children('span').each(function(index, el) {
			if($(el).html().indexOf('Logs') > -1){
				var item = $(el).children('span');

				if(item.is(':visible') && item.text() === '1'){
					done();
				}
			}
		});
	});

	it('dont trigger count when active', function(done){
		btm.toggle();

		btm.log('a');

		$('div#emu .btm .utils').children('span').each(function(index, el) {
			if($(el).html().indexOf('Logs') > -1){
				var item = $(el).children('span');

				if(!item.is(':visible') && item.text() === '0'){
					done();
				}
			}
		});
	});
});

describe('A btm#images', function(){
	it('can be added screenshots', function(){
		btm.image('haha', '#',  {
			width : 100,
			height: 100
		});
		expect($('div#emu .btm .images').find('li').length).to.above(0);
	});

	it('trigger count when not active', function(done){
		$('div#emu .btm .utils').children('span').each(function(index, el) {
			if($(el).html().indexOf('Images') > -1){
				var item = $(el).children('span');

				if(item.is(':visible') && item.text() === '1'){
					done();
				}
			}
		});
	});

	it('dont trigger count when active', function(){
		btm.toggle();

		btm.image('haha', '#', {
			width : 100,
			height: 100
		});

		expect($('div#emu .btm .images').find('li').length).to.above(1);

		$('div#emu .btm .utils').children('span').each(function(index, el) {
			if($(el).html().indexOf('Images') > -1){
				var item = $(el).children('span');

				if(item.is(':visible') && item.text() === '1'){
					done();
				}
			}
		});
	});

	after(function(){
		$('#emu').hide();
	})
});
})(jQuery);