(function($){
if(!utils.isDev && utils.url.full.indexOf('?') < 1){
	utils.url.to('?i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=%20Hello%20&empty');
}

describe('params', function(){
	it('should be an object', function(){
		expect(utils.url.param()).to.be.an('object');
	});

	it('should contain 5 keys', function(){
		expect(utils.url.param()).to.include.keys('enc', 'i', 'mode', 'sid', 'empty');
	});

	it('should contain right values for keys', function(){
		expect(utils.url.param('enc')).to.equal(' Hello ');
		expect(utils.url.param('i')).to.equal('main');
		expect(utils.url.param('mode')).to.equal('front');
		expect(utils.url.param('sid')).to.equal('de8d49b78a85a322c4155015fdce22c4');
		expect(utils.url.param('empty')).to.be.empty;
	});

	it('can check param existence', function(){
		expect(utils.url.param.has('enc')).to.be.true;
		expect(utils.url.param.has('bobo')).to.be.false;
	});

	it('can be added / set (more) params', function(){
		utils.url.param.add('hey', 'hello');

		expect(utils.url.param('hey')).to.equal('hello');
	});

	it('can be removed a param', function(){
		utils.url.param.rem('hey');

		expect(utils.url.param.has('hey')).to.be.false;
	});

	it('can build a queryString', function(){
		expect(utils.url.param.toString()).to.equal('?i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=%20Hello%20&empty');
	});
});

describe('url', function(){
	it('should not include queryString', function(){
		expect(utils.url.toString().indexOf('?')).to.below(1);
	});

	it('should include queryString in full mode', function(){
		expect(utils.url.full.indexOf('?')).to.above(0);
	});

	it('can build a new url with params', function(){
		expect(utils.url.with({a : ' b ', c : '', d : undefined})).to.equal(utils.url.url + '?a=%20b%20&c');
	});
});

describe('div#scale', function(){
	it('should have original size : 300x200(px)', function(){
		var test = $('#scale');
		expect(test.height()).to.equal(200);
		expect(test.width()).to.equal(300);
	});

	it('after scaling should keep size : 300x200(px)', function(){
		var test = $('#scale');
		utils.scale(test[0], 0.5);
		expect(test.height()).to.equal(200);
		expect(test.width()).to.equal(300);
	});

	it('after scaling should have scaled size : 150x100(px)', function(){
		var test = $('#scale')[0];
		var size = test.getBoundingClientRect();
		expect(size.height).to.equal(100);
		expect(size.width).to.equal(150);
	});
});

describe('div#center', function(){
	it('should have original position (0, 0)', function(){
		var offset = $('#center').offset();
		expect(offset.top).to.equal(0);
		expect(offset.left).to.equal(0);
	});

	it('can be centered', function(){
		var test = $('#center');
		utils.center(test[0]);
		var offset = test.offset();
		expect(offset.top).to.equal(Math.max(0, (($(window).height() - test.outerHeight()) / 2) + $(window).scrollTop()));
		expect(offset.left).to.equal(Math.max(0, (($(window).width() - test.outerWidth()) / 2) + $(window).scrollLeft()));
	});

	it('can be centered after scaled', function(){
		var test = $('#center');
		utils.center(test[0]);

		// position after centered (without scaling 0.5)
		var offset1 = test.offset();
		// calculate expected position after scaled 0.5 and centered
		var expectedOffset = {
			top : offset1.top + test.outerHeight() / 4,
			left : offset1.left + test.outerWidth() / 4
		}

		utils.scale(test[0], 0.5);
		utils.center(test[0]);

		// position after scaled 0.5 and centered
		var offset2 = test.offset();
		expect(offset2.top).to.equal(expectedOffset.top);
		expect(offset2.left).to.equal(expectedOffset.left);
	});

	after(function(){
		$('#center').hide();
		$('#scale').hide();
		$('#zoom').hide();
	});
});

describe('utils also', function(){
	it('can get the first key in an object', function(){
		expect(utils.first({a : 1, b : 2})).to.equal('a');
	});

	it('can loop a DOM/jQuery collection', function(done){
		var count = 0;
		utils.each($('div#center,div#scale'), function loop(){
			if(!$(this).is(':visible')){
				count++;
			}

			if(count > 1){
				done();
			}
		});
	});
});
})(jQuery);