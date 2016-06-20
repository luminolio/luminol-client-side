import { Http } from "./luminol.request";

export class LuminolComponent {
	protected rootDocument     : HTMLDocument;
	protected templateDocument : HTMLDocument;
	protected templateStyle    : HTMLStyleElement;

	constructor(tagname: String) 
	{

	}

	private _load() 
	{}

	private _loadStyle() 
	{}

	private _loadScript() 
	{}

	private _loadTemplate() 
	{}

	whenCreated() 
	{
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

var x = new LuminolComponent();