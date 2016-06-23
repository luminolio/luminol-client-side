define(["require", "exports"], function (require, exports) {
    "use strict";
    var Import = (function () {
        function Import(urls) {
            var _this = this;
            this._namespace = {};
            this._evts = {
                "load": function (context) { }
            };
            var countLoaded = 0;
            var countLoad = Object.keys(urls).length;
            var parentThis = this;
            var countToExecute = function () {
                countLoaded++;
                if (countLoaded == countLoad) {
                    _this._evts.load(_this._namespace);
                }
            };
            for (var key in urls) {
                var url = urls[key];
                var script = document.createElement("script");
                script.src = url;
                script.dataset['key'] = key;
                script.onload = function () {
                    parentThis._namespace[this.dataset.key] = luminolModule;
                    luminolModule = null;
                    countToExecute();
                };
                script.onerror = function () {
                    console.error("Error loading luminolModule:", "'" + this.dataset.key + "',", "file not found:", this.src);
                    countToExecute();
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