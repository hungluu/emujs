var btm = (function($){ // jshint ignore:line
	var ret,
		logs,
		logCount,
		image,
		imageList,
		imageCount,
		logging = false, // detect is logs box is open
		log,
		addImage,
		toggle,
		datetime, // get current datetime
		unread = 0;

	/**
	 * Add a log line to logs box
	 * @param  {String} text log contents
	 */
	log = function(text){
		$(logs).prepend('<p>' + text + '<i>' + datetime() + '</i></p>');

		// trigger event logs#count
		if(!logging){
			unread++;
			$(logCount).text(unread).show();
		}
	};

	/**
	 * Get current hh:mm:ss dd/mm/YY
	 * @return {[type]} [description]
	 */
	datetime = function(){
		var now = new Date(),
			mon = now.getMonth()+1, //January is 0!
			hh  = now.getHours(),
			mm  = now.getMinutes(),
			ss  = now.getSeconds();

		if(hh < 10){
			hh = '0' + hh;
		}
		if(mm < 10){
			mm = '0' + mm;
		}
		if(ss < 10){
			ss = '0' + ss;
		}

	    return hh + ':' + mm + ':' + ss + ' ' + now.getDate() +'/'+ mon +'/'+ (now.getFullYear() + '').slice(2);
	};

	/**
	 * Add a screenshot to images box
	 * @param {String} name image name
	 * @param {String} src
	 * @param {Object} size {width, height}
	 */
	addImage = function(name, src, size){
		var li = $('<li/>');
		$(image).show();

		$(imageList).prepend(li);

		li.css({
			'width' : li.height() / size.height * size.width,
			'background' : 'url(' + src + ')',
			'background-size' : 'cover'
		});

		li.html('<a target="_blank" href=' + src + '>' + name + '</a>');

		// trigger event images#count
		if(logging){
			$(image).hide();
			unread++;
			$(imageCount).text(unread).show();
		}
	};

	toggle = function(){
		unread = 0;
		$(logs).toggle();
		$(image).toggle();
		$(imageCount).hide().text(0);
		$(logCount).hide().text(0);
		if($(logs).is(':visible')){
			logging = true;
		}
		else{
			logging = false;
		}
	};

	ret = function(){
		// contains logs
		logs = $('<div/>').addClass('logs').hide()[0];
		// contains screenshots
		image =   $('<div/>').addClass('images')[0];
		imageList = $('<ul/>').appendTo(image);
		// triggered, unread logs count
		logCount = $('<span/>').hide()[0];
		// triggered, unseen screenshots count
		imageCount   = $('<span/>').hide()[0];

		// .utils bar
		var utilbar = $('<div/>').addClass('utils')[0];
		// open screenshots box
		$('<span/>').text('Images').append(imageCount).appendTo(utilbar).click(function clickEvent(){
			$(this).parent().children('span').removeClass('active');
			$(this).addClass('active');
			toggle();
		}).addClass('active');
		// open logs
		$('<span/>').text('Logs').append(logCount).appendTo(utilbar).click(function clickEvent(){
			$(this).parent().children('span').removeClass('active');
			$(this).addClass('active');
			toggle();
		});

		// layer < utils < image < logs --> #emu
		$('<div/>').addClass('btm layer').append(utilbar).append(image).append(logs).appendTo('#emu');
	};

	ret.log = log;
	ret.image = addImage;
	ret.toggle = toggle;

	return ret;
})($);