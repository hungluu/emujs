# EmuJS

[![Build Status](https://travis-ci.org/hungluu/emujs.svg?branch=master)](https://travis-ci.org/hungluu/emujs)

A responsiveness testing tool on browsers

What is it?
- Open source, under Apache-2.0 license
- Speed up your designing, testing responsiveness of your site in 1 click
- Bundled with an extendable list of common mobile devices.
- Screenshots

Demo :
- [Bootstrap 3](//hungluu.github.io/emujs)
- [Foundation](//hungluu.github.io/emujs/foundation.html)

Others :
- [Changelog](//github.com/hungluu/emujs/blob/master/HISTORY.md)
- [Contributors](//github.com/hungluu/emujs/network)

## Simple usage

```html
<html>
	...
	<link rel="stylesheet" href="//cdn.jsdelivr.net/emujs/1.0.3/emu.css">
	</head>
	<body>
		...
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="//cdn.jsdelivr.net/emujs/1.0.3/emu.js"></script>
		<script>emu();</script>
	</body>
</html>
```

## Install

1. Download [here](//github.com/hungluu/emujs/archive/master.zip) or

```shell
// with bower
bower install emujs

// or with npm
npm install --save emujs
```
2. Add ```emu.js``` to html file

```html
<html>
	...
	<link rel="stylesheet" href="path/to/emu.css">
	</head>
	<body>
		...
		<!-- optional - only if you want to take screenshots -->
		<script src="path/to/html2canvas.js"></script>

		<!-- must be loaded -->
		<script src="path/to/jquery.min.js"></script>

		<script src="path/to/emu.js"></script>
		<script>emu();</script>
	</body>
</html>
```

## Contribution

Everyone is welcomed :)

Here is some steps :

 1. Make sure you have a [Github](//github.com) account and have installed [npm](//npmjs.com)
 2. Fork this [repo](//github.com/hungluu/emujs), then clone with ```git@github.com:your-user-name/emujs.git```
 3. Run ```npm install``` to install all dependencies, if you haven't installed grunt-cli ```npm install -g grunt-cli```
 4. Run ```grunt test``` to be sure everything is working
 5. Make your changes ( optional write an additional test file if you'are adding something and the old test files cannot cover )
 6. Run ```grunt test``` again to make sure everything is working
 7. Push to your fork, create a [pull request](//github.com/hungluu/emujs/compare) and write a good commit message.

-----

This project is actively maintained. Please feel free to contact me if you need any further assistance.

Enjoy :beers: