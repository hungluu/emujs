// require json2.js for IE8- supports
var msg = (function(json2){ // jshint ignore:line
	var Messagebox, Gateway, ret;

	Messagebox = function(){
		this.handlers = [];
	};

	Messagebox.prototype = {
		/**
		 * Add a message handler
		 * @param {Function} handler
		 */
		add : function(handler){
			this.handlers.push(handler);
		},
		/**
		 * Trigger when a message received by this message box
		 * @param  {String} message
		 */
		receive : function(message){
			for(var i = this.handlers.length - 1; i >= 0; i--) {
				this.handlers[i](message);
			}
		},
		/**
		 * Reset all handlers
		 */
		reset : function(){
			this.handlers.length = 0;
		}
	};

	Gateway = function(){
		this.boxes = {};
	};

	Gateway.prototype = {
		/**
		 * Open a message box
		 * @param  {String} name message box's identifier
		 */
		open : function(name){
			this.boxes[name] = new Messagebox();
		},
		/**
		 * Close an opened message box
		 * @param  {String} name
		 */
		close : function(name){
			this.boxes[name] = undefined;
		},
		/**
		 * Check if a message box is opened
		 * @param  {String}  name
		 * @return {Boolean}
		 */
		isOpened : function(name){
			return typeof this.boxes[name] !== 'undefined';
		},
		/**
		 * Bind a message handler to a box
		 * @param  {String}   name receiver(message box)'s name
		 * @param  {Function} fn
		 */
		pull : function(name, handler){
			this.boxes[name].add(handler);
		},
		/**
		 * Send a message to a message box
		 * @param  {String} name name of receiver
		 * @param  {Misc} data
		 */
		push : function(name, data){
			parent.postMessage(json2.stringify({
				name : name,
				data : data
			}), '*');
		},
		/**
		 * Trigger when received a message, then forward the message to a named box
		 */
		receive : function(name, data){
			if(this.isOpened(name)){
				this.boxes[name].receive(data);
			}
		}
	};

	ret = new Gateway();

	window.onmessage = function(e){
		if(e.data){
			var parsed = json2.parse(e.data),
				name   = parsed.name || '""', // receiver
				data   = parsed.data || '""'; // data

			if(name){
				ret.receive(name, data);
			}
		}
	};

	return ret;
})(json2);