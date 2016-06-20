"use strict";
var LuminolComponent = (function () {
    function LuminolComponent(tagname) {
    }
    LuminolComponent.prototype._load = function () { };
    LuminolComponent.prototype._loadStyle = function () { };
    LuminolComponent.prototype._loadScript = function () { };
    LuminolComponent.prototype._loadTemplate = function () { };
    LuminolComponent.prototype.whenCreated = function () {
    };
    LuminolComponent.prototype.whenAttached = function () {
        return this;
    };
    LuminolComponent.prototype.whenDetached = function () {
        return this;
    };
    LuminolComponent.prototype.whenAttributeChanged = function () {
        return this;
    };
    return LuminolComponent;
}());
exports.LuminolComponent = LuminolComponent;
var x = new LuminolComponent();
//# sourceMappingURL=luminol.components.js.map