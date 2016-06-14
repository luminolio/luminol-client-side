var ComponentAutoExec = (function () {
    function ComponentAutoExec() {
        this._data = document.currentScript.innerHTML;
        var objData = JSON.parse(this._data);
        var i = 0;
        objData.import.forEach(function (value) {
            var completePath = objData.path.components + "/" + value.name + ".html";
            var link = document.createElement("link");
            link.rel = "import";
            link.href = completePath;
            document.head.appendChild(link);
        });
    }
    return ComponentAutoExec;
}());
new ComponentAutoExec();
var Component = (function () {
    function Component() {
        this._selfDocument = this._ownerDocument();
        this._component = this._selfDocument.querySelector("vnt-component");
        this._template = this._component.querySelector("template");
        this._style = this._component.querySelector("vnt-style");
        this._elementProto = Object.create(HTMLElement.prototype);
        var proxyThis = this;
        this._elementProto.createdCallback = function () {
            proxyThis.createdCallback(this);
        };
    }
    Component.prototype.createdCallback = function (element) {
        var shadow = element.createShadowRoot();
        var elStyle = document.createElement("style");
        elStyle.innerHTML = this._style.innerHTML;
        if (navigator.userAgent.search("Firefox") > -1) {
            elStyle.setAttribute("scoped", "scoped");
        }
        shadow.appendChild(elStyle);
        shadow.innerHTML += this._template.innerHTML;
    };
    Component.prototype._ownerDocument = function () {
        return (document._currentScript || document.currentScript).ownerDocument;
    };
    Component.prototype.assign = function (elementName) {
        document.registerElement(elementName, {
            prototype: this._elementProto
        });
    };
    return Component;
}());
//# sourceMappingURL=components.js.map