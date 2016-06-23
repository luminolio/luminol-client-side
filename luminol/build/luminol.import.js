define(["require", "exports"], function (require, exports) {
    "use strict";
    var Import = (function () {
        function Import(urls) {
            this._evts = {
                "load": function (context) { }
            };
            var countLoaded = 0;
            var countLoad = Object.keys(urls).length;
            var context = {};
            var callback = function () {
                countLoaded++;
                if (countLoaded == countLoad) {
                    console.log(context);
                }
                window['luminolModule'] = {};
            };
            if (!window['luminolModule']) {
                window['luminolModule'] = {};
            }
            for (var key in urls) {
                var url = urls[key];
                var script = document.createElement("script");
                script.src = url;
                script.dataset['key'] = key;
                script.onload = function () {
                    context[this.dataset.name] = window['luminolModule'];
                    callback();
                };
                script.onerror = function () {
                    callback();
                };
                document.head.appendChild(script);
            }
        }
        Import.prototype.on = function (event, callback) {
            if (callback instanceof Function) {
                this._evts[event] = callback;
            }
            return this;
        };
        Import.prototype.onLoad = function (callback) {
            return this.on("load", callback);
        };
        return Import;
    }());
    exports.Import = Import;
});
//# sourceMappingURL=luminol.import.js.map