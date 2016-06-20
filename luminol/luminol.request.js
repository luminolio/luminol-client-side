"use strict";
var Cue = (function () {
    function Cue() {
    }
    Cue.add = function (httpRequest) {
        this._cue.push(Http);
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
//
//
//
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
//
//
//
var Http = (function () {
    function Http(url) {
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
    Http.prototype.on = function (event, callback) {
        if (callback instanceof Function) {
            this._evts[event] = callback;
        }
        return this;
    };
    Http.prototype.exec = function (method) {
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
        //this._xhr.overrideMimeType('text/plain; charset=x-user-defined');
        this._xhr.open(method.toUpperCase(), this._url, this._async);
        this._xhr.addEventListener("progress", updateProgress, false);
        this._xhr.addEventListener("load", transferComplete, false);
        this._xhr.addEventListener("error", transferFailed, false);
        this._xhr.addEventListener("abort", transferCanceled, false);
        // @todo
        // implement cors
        // XDomainRequest for ie
        // withCredentials for w3c browsers
        this._xhr.send();
        return this;
    };
    Http.prototype.post = function () {
        return this.exec("POST");
    };
    Http.prototype.get = function () {
        return this.exec("GET");
    };
    Http.prototype.delete = function () {
        return this.exec("DELETE");
    };
    Http.prototype.put = function () {
        return this.exec("PUT");
    };
    Http.prototype.head = function () {
        return this.exec("HEAD");
    };
    Http.prototype.abort = function () {
        this._xhr.abort();
        return this;
    };
    Http.prototype.setResponseType = function (responseType) {
        var responseType = responseType.toLowerCase();
        this._xhr.responseType = responseType;
        return this;
    };
    Object.defineProperty(Http.prototype, "responseAsBlob", {
        get: function () {
            this.setResponseType("blob");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "responseAsText", {
        get: function () {
            this.setResponseType("text");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "responseAsJson", {
        get: function () {
            this.setResponseType("json");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "responseAsDocument", {
        get: function () {
            this.setResponseType("document");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "responseAsHtml", {
        get: function () {
            return this.responseAsDocument;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "responseAsXml", {
        get: function () {
            return this.responseAsDocument;
        },
        enumerable: true,
        configurable: true
    });
    Http.prototype._XMLHttpRequest = function () {
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
    return Http;
}());
exports.Http = Http;
// import * as request from "assets/vanuatu/request";
// var x = new request.Http("https://httpbin.org/image/jpeg")
// var x = new request.Http("https://httpbin.org/image/png")
// var x = new request.Http("https://httpbin.org/image/svg")
// 	.responseAsBlob
// var x = new request.Http("https://httpbin.org/html")
// .on("data", (response) => {
// 	console.log("DATA", response);
// })
// .on("error", (response) => {
// 	console.log("ERROR", response);
// })
// .on("success", (response) => {
// 	console.log("SUCCESS", response);
// 	if (response.type == "blob") {
// 		document.body.appendChild( response.img );
// 	}
// })
// .on("cancel", (response) => {
// 	console.log("CANCELED", response);
// })
// .exec("GET"); 
//# sourceMappingURL=luminol.request.js.map