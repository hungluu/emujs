(function($){
describe('A gateway', function(){
	it('should have a list of message boxes', function(){
		expect(msg.boxes).to.exists;
	});

	it('can open a new message box', function(){
		msg.open('a');

		expect(msg.isOpened('a')).to.be.true;
	});

	it('can close an opened message box', function(){
		msg.close('a');

		expect(msg.isOpened('a')).to.be.false;
	});

	it('can add a message handler to an existing box', function(){
		msg.open('b');
		msg.pull('b', function(data){});
		expect(msg.boxes.b.handlers.length).to.above(0);
	});

	it('can send a message to a box', function(done){
		msg.pull('b', function(data){ return done(); });
		msg.push('b', 'haha');
	});

	it('can forward a message to a right box', function(done){
		var success = 0;

		function ok(){
			success++;
			if(success > 2){
				done();
			}
		}

		msg.open('c');
		msg.open('a');
		msg.open('d');
		msg.pull('a', function(data){
			if(data === 'yeah'){
				ok();
			}
		});
		msg.pull('c', function(data){
			if(data === 1){
				ok();
			}
		});
		msg.pull('d', function(data){
			if(typeof data === 'object'){
				ok();
			}
		});


		msg.push('a', 'yeah');
		msg.push('c', 1);
		msg.push('d', {});
	});
});
})(jQuery);