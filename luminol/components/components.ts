class ComponentAutoExec {
	private _data = document.currentScript.innerHTML;

	constructor () {
		var objData = JSON.parse(this._data);

		var i = 0;
		objData.import.forEach((value)=>{
			var completePath = `${objData.path.components}/${value.name}.html`;
			var link = document.createElement("link");
			link.rel = "import";
			link.href = completePath;
			document.head.appendChild(link);
		});

	}
}

new ComponentAutoExec();

class Component{
	private _selfDocument = this._ownerDocument();
	private _component    = this._selfDocument.querySelector("vnt-component");
	private _template     = this._component.querySelector("template");
	private _style        = this._component.querySelector("vnt-style");
	private _elementProto = Object.create(HTMLElement.prototype);

	constructor () {
		var proxyThis = this;
		this._elementProto.createdCallback = function () {
			proxyThis.createdCallback(this);
		};
	}

	private createdCallback (element) {
		var shadow = element.createShadowRoot();
		var elStyle = document.createElement("style");
		
		elStyle.innerHTML = this._style.innerHTML;

		if (navigator.userAgent.search("Firefox") > -1) {
			elStyle.setAttribute("scoped", "scoped");
		}

		shadow.appendChild(elStyle);

		shadow.innerHTML += this._template.innerHTML;
	}

	private _ownerDocument() {
		return (document._currentScript || document.currentScript).ownerDocument
	}

	assign (elementName) {
		document.registerElement(elementName, {
			prototype: this._elementProto
		});
	}
}
