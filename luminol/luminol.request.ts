class Cue {
	private static _cue = [];

	static add(httpRequest: Http) {
		this._cue.push(Http);
	}

	static abort() {
		var http;
		while (http = this._cue.pop()) {
			http.abort();
		}
	};
}

//
//
//

class HttpResponseObject {
	private xhr;
	private event;
	private data;
	private type;
	private response;

	constructor (xhr, event) {
		this.xhr   = xhr;
		this.event = event;
		this.data  = this.xhr.response;
		this.type  = this.xhr.responseType;
	}

	get img () {
		if (this.type == "blob" && this.data.type.indexOf("image/") == 0) {
			var img = new Image();
			img.src = URL.createObjectURL(this.data);
			return img;
		} else {
			return null;
		}
	}
}

//
//
//

export class Http {
	private _url = null;
	private _xhr;
	private _async = true;
	private _evts = {
		"data"    : function(httpResp: HttpResponseObject) { },
		"error"   : function(httpResp: HttpResponseObject) { },
		"success" : function(httpResp: HttpResponseObject) { },
		"cancel"  : function(httpResp: HttpResponseObject) { }
	};

	constructor(url: string) {
		this._xhr = this._XMLHttpRequest();
		this._url = encodeURI(url);
		Cue.add(this._xhr);
	}

	on(event, callback) {
		if (callback instanceof Function) {
			this._evts[event] = callback;
		}
		return this;
	}

	exec(method) {
		var updateProgress = (event) => {
			this._evts.data(new HttpResponseObject(this._xhr, event));
		}; 

		var transferComplete = () => {
			this._evts.success(new HttpResponseObject(this._xhr, event));
		}; 

		var transferFailed = () => {
			this._evts.error(new HttpResponseObject(this._xhr, event));
		};

		var transferCanceled = () => {
			this._evts.cancel(new HttpResponseObject(this._xhr, event));
		};

		//this._xhr.overrideMimeType('text/plain; charset=x-user-defined');

		this._xhr.open(method.toUpperCase(), this._url, this._async);

		this._xhr.addEventListener("progress" , updateProgress   , false);
		this._xhr.addEventListener("load"     , transferComplete , false);
		this._xhr.addEventListener("error"    , transferFailed   , false);
		this._xhr.addEventListener("abort"    , transferCanceled , false);

		// @todo
		// implement cors
		// XDomainRequest for ie
		// withCredentials for w3c browsers

		this._xhr.send();
		return this;
	}

	post() {
		return this.exec("POST");
	}

	get() {
		return this.exec("GET");
	}

	delete() {
		return this.exec("DELETE");
	}

	put() {
		return this.exec("PUT");
	}

	head() {
		return this.exec("HEAD");
	}

	abort() {
		this._xhr.abort();
		return this;
	}

	setResponseType (responseType: string) {
		var responseType = responseType.toLowerCase();
		this._xhr.responseType = responseType;
		return this;
	}

	get responseAsBlob () {
		this.setResponseType("blob");
		return this;
	}

	get responseAsText () {
		this.setResponseType("text");
		return this;
	}

	get responseAsJson () {
		this.setResponseType("json");
		return this;
	}

	get responseAsDocument () {
		this.setResponseType("document");
		return this;
	}

	get responseAsHtml () {
		return this.responseAsDocument;
	}

	get responseAsXml () {
		return this.responseAsDocument;
	}

	private _XMLHttpRequest() {
		try {
			return new XMLHttpRequest();
		} catch (e) { }

		try {
			return new ActiveXObject("Msxml3.XMLHTTP");
		} catch (e) { }

		try {
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) { }

		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (e) { }

		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) { }

		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) { }

		return null;
	}
}


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