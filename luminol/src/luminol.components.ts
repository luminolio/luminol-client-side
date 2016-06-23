import { Request } from "./luminol.request";
import { Import } from "./luminol.import";
import config = require("./_config");

export class LuminolComponent {
	protected rootDocument     : HTMLDocument;
	protected templateDocument : HTMLDocument;
	protected templateStyle    : HTMLStyleElement;
	protected innerHTML        : String;

	constructor(tagname: String) {
		this._load(tagname);
	}

	private _load(moduleName: String) {
		new Import({
			dunha : `../${config.path.components}/${moduleName}/component.js`,
			// zika: "zikaaaa",
			// $: "jToba",
			// dirce: "dirceee"
		})
		
		.onLoad(
			(nspace) => {
				console.log("------------------------");
				console.log(nspace);
			}
		);


		// "../luminol/components/teste/component";
		// `../${config.path.components}/${moduleName}/component.js`
		
		// var load = new Request.http(`../${config.path.components}/${moduleName}/config.json`)
		// 	.responseAsJson
		// 	.onSuccess( 
		// 		(resp) => {
		// 			console.log(resp.data);
		// 		}
		// 	)
		// 	.get;
	}

	private _loadStyle() {}

	private _loadScript() {}

	private _loadTemplate() {}

	whenCreated() {
		//createdCallback
	}

	whenAttached()
	{
		// attachedCallback
		return this;
	}

	whenDetached()
	{
		// detachedCallback()
		return this;
	}

	whenAttributeChanged()
	{
		// attributeChangedCallback
		return this;
	}
}

// var x = new LuminolComponent();