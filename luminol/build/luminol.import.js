define(["require", "exports"], function (require, exports) {
    "use strict";
    var Import = (function () {
        function Import(urls) {
            var _this = this;
            this._namespace = {};
            this._evts = {
                "load": function (context, info) { }
            };
            var countLoaded = 0;
            var countLoad = Object.keys(urls).length;
            var parentThis = this;
            var countToExecute = function () {
                countLoaded++;
                if (countLoaded == countLoad) {
                    var info = {
                        paths: urls
                    };
                    _this._evts.load(_this._namespace, info);
                }
            };
            for (var key in urls) {
                var url = urls[key];
                var script = document.createElement("script");
                script.src = url;
                script.dataset['key'] = key;
                script.onload = function () {
                    if (typeof luminolComponent == "undefined" || luminolComponent == null) {
                        console.error("Error loading luminolComponent:", "'" + this.dataset.key + "',", "luminolComponent not found in:", this.src);
                    }
                    else {
                        parentThis._namespace[this.dataset.key] = luminolComponent;
                        luminolComponent = null;
                    }
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