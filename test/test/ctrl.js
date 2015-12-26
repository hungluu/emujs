(function($){
describe('A ctrl bar', function(){
	before(function(){
		ctrl({
			a : 'b',
			b : 'c'
		});
	});

	it('should be created', function(){
		expect($('div#emu .ctrl').length).to.above(0);
	});

	it('should be a top layer', function(){
		var e = $('div#emu .ctrl');

		expect(e.hasClass('top')).to.be.true;
		expect(e.hasClass('layer')).to.be.true;
	});

	it('should contain a search box', function(){
		expect($('div#emu .ctrl').find('input').length).to.above(0);
	});
});

describe('A filled ctrl bar', function(){
	it('should have provided options rendered', function(){
		expect($('div#emu .ctrl').find('span').length).to.equal(2);
	});

	it('should active the first option by default', function(){
		expect($($('div#emu .ctrl').find('span')[0]).hasClass('active')).to.be.true;
	});

	it('should be searchable', function(){
		var e = $('div#emu .opts').children('span');

		// find 'a'
		ctrl.search('a');
		expect($(e[0]).is(':visible')).to.be.true;
		expect($(e[1]).is(':visible')).to.be.false;

		// find 'b'
		ctrl.search('b');
		expect($(e[1]).is(':visible')).to.be.true;
		expect($(e[0]).is(':visible')).to.be.false;

		// find 'c' --> not found
		ctrl.search('c');
		expect($(e[0]).is(':visible')).to.be.false;
		expect($(e[1]).is(':visible')).to.be.false;

		// find '' --> reset visibility
		ctrl.search('');
		expect($(e[0]).is(':visible')).to.be.true;
		expect($(e[1]).is(':visible')).to.be.true;
	});
});

describe('An empty bar', function(){
	before(function(){
		ctrl.build({});
	});

	it('should have no option', function(){
		expect($('div#emu .ctrl').find('span').length).to.equal(0);
	});

	after(function(){
		$('#emu').hide();
	})
});
})(jQuery);