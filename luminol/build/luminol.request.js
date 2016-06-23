define(["require", "exports"], function (require, exports) {
    "use strict";
    var Cue = (function () {
        function Cue() {
        }
        Cue.add = function (httpRequest) {
            this._cue.push(Request.http);
        };
        Cue.abort = function () {
            var http;
            while (http = this._cue.pop()) {
                http.abort();
            }
        };
        ;
        Cue._cue = [];
        return Cue;
    }());
    var HttpResponseObject = (function () {
        function HttpResponseObject(xhr, event) {
            this.xhr = xhr;
            this.event = event;
            this.data = this.xhr.response;
            this.type = this.xhr.responseType;
        }
        Object.defineProperty(HttpResponseObject.prototype, "img", {
            get: function () {
                if (this.type == "blob" && this.data.type.indexOf("image/") == 0) {
                    var img = new Image();
                    img.src = URL.createObjectURL(this.data);
                    return img;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        return HttpResponseObject;
    }());
    var Request;
    (function (Request) {
        var http = (function () {
            function http(url) {
                this._url = null;
                this._async = true;
                this._evts = {
                    "data": function (httpResp) { },
                    "error": function (httpResp) { },
                    "success": function (httpResp) { },
                    "cancel": function (httpResp) { }
                };
                this._xhr = this._XMLHttpRequest();
                this._url = encodeURI(url);
                Cue.add(this._xhr);
            }
            http.prototype.on = function (event, callback) {
                if (callback instanceof Function) {
                    this._evts[event] = callback;
                }
                return this;
            };
            http.prototype.onSuccess = function (callback) {
                return this.on("success", callback);
            };
            http.prototype.onData = function (callback) {
                return this.on("data", callback);
            };
            http.prototype.onError = function (callback) {
                return this.on("error", callback);
            };
            http.prototype.onCancel = function (callback) {
                return this.on("cancel", callback);
            };
            http.prototype.exec = function (method) {
                var _this = this;
                var updateProgress = function (event) {
                    _this._evts.data(new HttpResponseObject(_this._xhr, event));
                };
                var transferComplete = function () {
                    _this._evts.success(new HttpResponseObject(_this._xhr, event));
                };
                var transferFailed = function () {
                    _this._evts.error(new HttpResponseObject(_this._xhr, event));
                };
                var transferCanceled = function () {
                    _this._evts.cancel(new HttpResponseObject(_this._xhr, event));
                };
                this._xhr.open(method.toUpperCase(), this._url, this._async);
                this._xhr.addEventListener("progress", updateProgress, false);
                this._xhr.addEventListener("load", transferComplete, false);
                this._xhr.addEventListener("error", transferFailed, false);
                this._xhr.addEventListener("abort", transferCanceled, false);
                this._xhr.send();
                return this;
            };
            Object.defineProperty(http.prototype, "post", {
                get: function () {
                    return this.exec("POST");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "get", {
                get: function () {
                    return this.exec("GET");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "delete", {
                get: function () {
                    return this.exec("DELETE");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "put", {
                get: function () {
                    return this.exec("PUT");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "head", {
                get: function () {
                    return this.exec("HEAD");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "abort", {
                get: function () {
                    this._xhr.abort();
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            http.prototype.setResponseType = function (responseType) {
                var responseType = responseType.toLowerCase();
                this._xhr.responseType = responseType;
                return this;
            };
            Object.defineProperty(http.prototype, "responseAsBlob", {
                get: function () {
                    this.setResponseType("blob");
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "responseAsText", {
                get: function () {
                    this.setResponseType("text");
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "responseAsJson", {
                get: function () {
                    this.setResponseType("json");
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "responseAsDocument", {
                get: function () {
                    this.setResponseType("document");
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "responseAsHtml", {
                get: function () {
                    return this.responseAsDocument;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(http.prototype, "responseAsXml", {
                get: function () {
                    return this.responseAsDocument;
                },
                enumerable: true,
                configurable: true
            });
            http.prototype._XMLHttpRequest = function () {
                try {
                    return new XMLHttpRequest();
                }
                catch (e) { }
                try {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
                catch (e) { }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch (e) { }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                }
                catch (e) { }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) { }
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) { }
                return null;
            };
            return http;
        }());
        Request.http = http;
    })(Request = exports.Request || (exports.Request = {}));
});
//# sourceMappingURL=luminol.request.js.map