(function($){
describe('A screenshot', function(){
	var screenshot;

	before(function(){
		// open screenshot channel
		msg.open('screenshot');
	});

	it('can be uploaded throught message#screenshot', function(done){
		msg.pull('screenshot', function(data){
			var img = $('<img/>', {
				onload : function load(){
					if(data.size && data.src){
						done();
					}
				},

				src : data.src
			}).appendTo('body');
		});

		printscr(document.body);
	});

	it('should capture the whole element', function(){
		document.body.style.overflow = "hidden";
		expect($('img').width()).to.equal($(window).width());
		expect($('img').height()).to.equal($(window).height());
	});

	after(function(){
		$('img').hide();
	});
});
})(jQuery);