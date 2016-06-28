declare var luminolComponent: any;

export class Import {
	private _namespace = {};
	private _evts = {
		"load": function (context, info) { }
	};

	/**
	 *
	 */

	constructor(urls) {
		var countLoaded = 0;
		var countLoad = Object.keys(urls).length;
		var parentThis = this;

		//

		var countToExecute = () => {
			countLoaded++;
			if (countLoaded == countLoad) {
				var info = {
					paths: urls
				};
				this._evts.load(this._namespace, info);
			}
		}

		//

		for (var key in urls) {

			//

			var url    = urls[key];
			var script = document.createElement("script");

			//

			script.src = url;
			script.dataset['key'] = key;

			//

			script.onload = function() {
				if (typeof luminolComponent == "undefined" || luminolComponent == null) {
					console.error(
						"Error loading luminolComponent:",
						`'${this.dataset.key}',`,
						"luminolComponent not found in:",
						this.src
					);
				} else {
					parentThis._namespace[this.dataset.key] = luminolComponent;
					luminolComponent = null;
				}
				countToExecute();
			};

			//

			script.onerror = function() {
				console.error(
					"Error loading luminolModule:",
					`'${this.dataset.key}',`,
					"file not found:",
					this.src
				);
				countToExecute();
			}

			//

			document.head.appendChild(script);
		}
	}

	/**
	 *
	 */

	on(event, callback) {
		if (callback instanceof Function) {
			this._evts[event] = callback;
		}
		return this;
	}

	/**
	 *
	 */

	onLoad(callback) {
		return this.on("load", callback);
	}
}
