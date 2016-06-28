import { HttpRequest } from "./luminol.request";
import { Import } from "./luminol.import";
import config = require("./_config");

class LuminolComponent {
	private _evts = {
		whenCreated: function(){
			var shadowRoot = this.createShadowRoot();
			var clone = document.createElement("span");
			clone.innerText = "xxxxxx";
			shadowRoot.appendChild(clone);
		}
	}

	/**
	 *
	 */

	 constructor(){

	 }

	/**
	 *
	 */

	loadStyle() {
		//
		return this;
	}

	/**
	 *
	 */

	loadTemplate(value: String | Function) {
		//
		console.log(value);
		return this;
	}

	/**
	 *
	 */

	whenCreated() {
		//createdCallback
		return this;
	}

	/**
	 *
	 */

	whenAttached() {
		// attachedCallback
		return this;
	}

	/**
	 *
	 */

	whenDetached() {
		// detachedCallback()
		return this;
	}

	/**
	 *
	 */

	whenAttributeChanged() {
		// attributeChangedCallback
		return this;
	}

	/**
	 *
	 */

	register(tagname: String) {
		 var proto = Object.create(HTMLElement.prototype);
		 proto.createdCallback = this._evts.whenCreated;
		document.registerElement("vnt-"+tagname, {
			prototype: proto
		});
	}
}

export class LuminolComponentLoader
{
	protected rootDocument     : HTMLDocument;
	protected templateDocument : HTMLDocument;
	protected templateStyle    : HTMLStyleElement;
	protected innerHTML        : String;

	/**
	 *
	 */
	constructor(modulePath: String) {
		this._load(modulePath);
	}

	/**
	 *
	 */
	private _load(modulePath: String)	{
		new Import(
				{
					runModuleScript: `../${config.path.components}/${modulePath}.js`
				}
			)

			.onLoad(
				function(luminol, info){
					if (
						luminol.runModuleScript
						&& typeof luminol.runModuleScript == "function"
					) {
						luminol.runModuleScript(LuminolComponent);
					} else {
						console.error(
							'variable luminolModule in for luminolWebComponents needs to be an Function'
						)
					}
				}
			);
	}
}

// var x = new LuminolComponent();
