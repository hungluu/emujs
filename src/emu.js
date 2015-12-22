var emu = (function($){ // jshint ignore:line
	var _list = {
			'iPhone_6' : '750x1334',
			'iPhone_5' : '640x1136',
			'iPhone_4' : '640x960',
			'iPhone_3' : '320x480',
			'iPod_Touch' : '640x1136',
			'LG_G4' : '1440x2560',
			'LG_G3' : '1440x2560',
			'LG_Optimus_G' : '768x1280',
			'Galaxy_Note_2' : '720x1280',
			'Galaxy_Note' : '800x1280',
			'Galaxy_S5' : '1080x1920',
			'Galaxy_S4' : '1080x1920',
			'Galaxy_S4_mini' : '540x960',
			'Galaxy_S3' : '720x1280',
			'Galaxy_S3_mini' : '480x800',
			'Galaxy_S2' : '480x800',
			'Galaxy_S' : '480x800',
			'Galaxy_Nexus' : '720x1200',
			'LG_Nexus_5' : '1080x1920',
			'LG_Nexus_4' : '768x1280',
			'Lumia_1020' : '768x1280',
			'Lumia_925' : '768x1280',
			'Lumia_920' : '768x1280',
			'Lumia_900' : '480x800',
			'Lumia_830' : '720x1280',
			'Lumia_620' : '480x800',
			'HTC_One' : '1080x1920',
			'HTC_8X' : '720x1280',
			'HTC_Evo_3D' : '540x960',
			'Xperia_Z3' : '1080x1920',
			'Xperia_Z' : '1080x1920',
			'Xperia_S' : '720x1280',
			'Xperia_P' : '540x960',
			'Xiaomi_Mi_4' : '1080x1920',
			'Xiaomi_Mi_3' : '1080x1920',
			'Lenovo_K900' : '1080x1920',
			'Pantech_Vega_n°6' : '1080x1920',
			'Blackberry_Leap' : '720x1280',
			'Blackberry_Passport' : '1440x1440',
			'Blackberry_Classic' : '720x720',
			'Blackberry_Q10' : '720x720',
			'Blackberry_Z30' : '720x1280',
			'Blackberry_Z10' : '768x1280',
			'Blackberry_Torch_9800' : '360x480',
			'ZTE_Grand_S' : '1080x1920',
			'ZTE_Open_Firefox_OS' : '480x720',
			'iPhone_6_Plus' : '1080x1920',
			'Motorola_Nexus_6' : '1440x2560',
			'Lumia_1520' : '1080x1920',
			'Galaxy_Note_4' : '1440x2560',
			'Galaxy_Note_3' : '1080x1920',
			'iPad_Pro' : '2048x2732',
			'iPad_3_4_Air' : '1536x2048',
			'iPad_1_2' : '768x1024',
			'iPad_mini_2_3' : '1536x2048',
			'iPad_mini' : '768x1024',
			'Galaxy_Tab_3_10"' : '800x1280',
			'Galaxy_Tab_2_10"' : '800x1280',
			'Galaxy_Tab_8.9"' : '800x1280',
			'Galaxy_Tab_2_7"' : '600x1024',
			'Nexus_10' : '1600x2560',
			'HTC_Nexus_9' : '1538x2048',
			'Asus_Nexus_7_v2' : '1080x1920',
			'Asus_Nexus_7_v1' : '800x1280',
			'LG_G_Pad_8.3' : '1200x1920',
			'Kindle_Fire_HD_8.9' : '1200x1920',
			'Kindle_Fire_HD_7' : '800x1280',
			'Kindle_Fire' : '600x1024',
			'Surface_Pro_3' : '1440x2160',
			'Surface_Pro_2' : '1080x1920',
			'Surface_Pro' : '1080x1920',
			'Surface' : '768x1366',
			'Blackberry_Playbook' : '600x1024',
			'Google_Glass' : '640x360'
		},
		_active = 'iPhone_5',
		ret;

	// import "assets/param.js"
	// import "assets/scale.js"
	// import "assets/center.js"
	// import "assets/mbox.js"
	// import "assets/screenshot.js"
	// import "assets/container.js"
	// import "assets/bar.js"
	// import "assets/view.js"
	// import "assets/expand.js"

	if(window === window.top){ // detect iframe
		ret = function(id){
			if(id){
				bar.list(_list, id);
				view.set(_list[id]);
			}
			else{
				bar();

				bar.list(_list, _active);

				view();

				expand();

				$('<button/>').addClass('emu btn open').text('emu').appendTo(document.body).click(function() {
					$(container()).fadeToggle('fast');
				});
			}
		};

		$(document).ready(function(){
			view.set(_list[_active]);
			$(container()).hide();
		});

		$(window).resize(function(){
			view.set(_list[_active]);
		});

	}
	else{
		ret = function(){};
		if(param('screenshot')){
			$(window).load(function(){
				screenshot(document.body);
			});
		}
	}

	ret.add = function(name, screenSolution){
		_list[name] = screenSolution;
	};

	ret.on = function(event, callback){
		mbox.receive(event, callback);
	};

	return ret;
})(jQuery); // jshint ignore:line
//