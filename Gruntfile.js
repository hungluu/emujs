var sass = require('node-sass')

var buildList = function(files){
	var test = [
		'msg',
		'printscr',
		'ctrl',
		'view',
		'btm'
	];

	var result = [];

	if(!files){
		for(var i = 0, l = test.length; i < l; i++){
			result.push('http://localhost:8080/test/' + test[i].replace('/', '.') + '.html');
		}

		result.unshift('http://localhost:8080/test/utils.html?i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=+Hello%20&empty');
	}
	else{
		for(var i = 0, l = test.length; i < l; i++){
			result.push('src/' + test[i] + '.js');
		}

		result.unshift('js/assets/utils.js');
	}

	return result;
}

function header(grunt){
	return grunt.template.process('/*! <%= pkg.name %> v<%= pkg.version %> - <%= pkg.author %> (c) <%= grunt.template.today("yyyy") %> */\n', grunt.config.get('pkg'));
}

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mocha: {
			assets : {
				options: {
					run: false,
					urls: buildList(),
					timeout: 50000,
					reporter: 'Spec',
					growlOnSuccess: false
				}
			},
			dist : {
				options: {
					run: false,
					urls: ['http://localhost:8080/test/emu.html'],
					timeout: 50000,
					reporter: 'Spec',
					growlOnSuccess: false
				}
			}
		},
		connect: {
			ci: {
				options: {
					port: 8080,
					base: '.',
				}
			},
			local: {
				options: {
					port: 80,
					base: '.'
				}
			}
		},
		jshint : {
			assets : {
				src : buildList(true),
				options : {
					"curly" : true,
					"eqnull" : true,
					"eqeqeq" : true,
					"undef" : true,
					"mocha" : true,
					"jquery" : true,
					"globals" : {
						'html2canvas' : true
					},
					"browser" : true,
					"bitwise" : true,
					"immed" : true,
					"newcap" : true,
					"noarg" : true,
					"undef" : true,
					"quotmark" : true,
					// "strict" : true,
					"unused" : "strict",
					reporter : require('jshint-stylish')
				}
			},

			dist : {
				src : 'dist/emu.js',
				options : {
					"curly" : true,
					"eqnull" : true,
					"eqeqeq" : true,
					"undef" : true,
					"mocha" : true,
					"jquery" : true,
					"globals" : {
						'html2canvas' : true
					},
					"browser" : true,
					"bitwise" : true,
					"immed" : true,
					"newcap" : true,
					"noarg" : true,
					"undef" : true,
					"quotmark" : true,
					//"strict" : true,
					"unused" : "strict",
					reporter : require('jshint-stylish')
				}
			}
		},
		includes: {
			js: {
				options: {
					includeRegexp: /^.+\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
					duplicates: false,
					debug: true
				},
				files: [{
					cwd: '.',
					src: 'js/emu.js',
					dest: 'dist/emu.js',
				}],
			},
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/emu.css': ['dist/emu.css']
				}
			}
		},
		sass: {															// Task
				dist: {														// Target
					options: {											 // Target options
						style: 'expanded',
						implementation: sass,
						sourceMap: true
					},
					files: {												 // Dictionary of files
						'dist/emu.css': 'css/emu.scss'		 // 'destination': 'source'
					}
				}
			}
	});

	// Load plugin
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-sass');

	// Task to run tests
	grunt.registerTask('local', ['connect:local:keepalive']);
	grunt.registerTask('resetDist', function(){
		var fs = require('fs');

		try {
			// Query the entry
			stats = fs.lstatSync('dist/emu.js');

			// Is it a directory?
			if (stats.isFile()) {
				fs.unlinkSync('dist/emu.js');
			}
		}
		catch (e) {
		}

		try {
			// Query the entry
			stats = fs.lstatSync('dist/emu.css');

			// Is it a directory?
			if (stats.isFile()) {
				fs.unlinkSync('dist/emu.css');
			}
		}
		catch (e) {
		}

		try {
			// Query the entry
			stats = fs.lstatSync('dist/emu.css.map');

			// Is it a directory?
			if (stats.isFile()) {
				fs.unlinkSync('dist/emu.css.map');
			}
		}
		catch (e) {
		}
	});

	grunt.registerTask('compress', function(){
		var fs = require('fs');
		var request = require('request');

		var done = this.async();

		function success(message){
			grunt.log.writeln(('[Compress] ' + message)['yellow'].bold);
		}

		function fail(message){
			grunt.log.writeln(('[Compress] ' + message)['red'].bold);
		}

		var css = fs.readFileSync('dist/emu.css');

		fs.unlinkSync('dist/emu.css');

		fs.writeFileSync('dist/emu.css', header(grunt) + css);

		success('Copying done --> dist/emu.css');

		request.post({
			url :'https://closure-compiler.appspot.com/compile',
			form : {
				js_code : fs.readFileSync('dist/emu.js'),
				compilation_level : 'SIMPLE_OPTIMIZATIONS',
				output_format : 'text',
				language : 'ECMASCRIPT5',
				output_info : 'compiled_code'
			},
			headers : { "Content-type" : "application/x-www-form-urlencoded" }
		},
		function(err,httpResponse,body){
			if(err){
				fail('Fail to request gc API');
				grunt.log.write(err);
				done();
			}
			else if(httpResponse.statusCode === 200){
				success('Copying contents');

				fs.unlinkSync('dist/emu.js');

				fs.writeFile("dist/emu.js", header(grunt) + body, function(err) {
					if(err) {
						fail('Fail copying');
					}

					success('Copying done --> dist/emu.js');
					done();
				});
			}
		});
	});

	grunt.registerTask('test', ['resetDist', 'connect:ci', 'jshint:assets', 'mocha:assets', 'includes:js', 'jshint:dist', 'sass', 'mocha:dist', 'resetDist']);

	grunt.registerTask('dist', ['resetDist', 'sass', 'cssmin', 'includes:js', 'jshint:dist', 'connect:ci', 'mocha:dist', 'compress']);

	grunt.registerTask('build', ['test', 'includes:js', 'sass', 'cssmin', 'compress']);
};