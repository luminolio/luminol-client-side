export class Import {
	private _evts = {
		"load": function (context) { }
	};

	constructor(urls) {
		var countLoaded = 0;
		var countLoad = Object.keys(urls).length;
		var context = {};

		var callback = () => {
			countLoaded++;
			if (countLoaded == countLoad) {
				console.log(context)
			}
			window['luminolModule'] = {};
		}

		if (!window['luminolModule']) {
			window['luminolModule'] = {};
		}

		for (var key in urls) {
			var url = urls[key];
			
			var script = document.createElement("script");
			
			script.src = url;
			script.dataset['key'] = key;

			script.onload = function(){
				context[this.dataset.key] = window['luminolModule'];
				callback();
			};

			script.onerror = function() {
				callback();
			}
			
			document.head.appendChild(script);
		}
	}

	on(event, callback) {
		if (callback instanceof Function) {
			this._evts[event] = callback;
		}
		return this;
	}

	onLoad(callback) {
		return this.on("load", callback);
	}
}