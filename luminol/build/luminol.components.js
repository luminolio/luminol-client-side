define(["require", "exports", "./luminol.import", "./_config"], function (require, exports, luminol_import_1, config) {
    "use strict";
    var LuminolComponent = (function () {
        function LuminolComponent(tagname) {
            this._load(tagname);
        }
        LuminolComponent.prototype._load = function (moduleName) {
            new luminol_import_1.Import({
                dunha: "../" + config.path.components + "/" + moduleName + "/component.js",
                zika: "zikaaaa",
                $: "jtoba",
                dirce: "dirceee"
            })
                .onLoad(function (context) {
                console.log("---------");
                console.log(context);
            });
        };
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
});
//# sourceMappingURL=luminol.components.js.map