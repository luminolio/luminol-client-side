define(["require", "exports", "./luminol.import", "./_config"], function (require, exports, luminol_import_1, config) {
    "use strict";
    var LuminolComponent = (function () {
        function LuminolComponent() {
            this._evts = {
                whenCreated: function () {
                    var shadowRoot = this.createShadowRoot();
                    var clone = document.createElement("span");
                    clone.innerText = "xxxxxx";
                    shadowRoot.appendChild(clone);
                }
            };
        }
        LuminolComponent.prototype.loadStyle = function () {
            return this;
        };
        LuminolComponent.prototype.loadTemplate = function (value) {
            console.log(value);
            return this;
        };
        LuminolComponent.prototype.whenCreated = function () {
            return this;
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
        LuminolComponent.prototype.register = function (tagname) {
            var proto = Object.create(HTMLElement.prototype);
            proto.createdCallback = this._evts.whenCreated;
            document.registerElement("vnt-" + tagname, {
                prototype: proto
            });
        };
        return LuminolComponent;
    }());
    var LuminolComponentLoader = (function () {
        function LuminolComponentLoader(modulePath) {
            this._load(modulePath);
        }
        LuminolComponentLoader.prototype._load = function (modulePath) {
            new luminol_import_1.Import({
                runModuleScript: "../" + config.path.components + "/" + modulePath + ".js"
            })
                .onLoad(function (luminol, info) {
                if (luminol.runModuleScript
                    && typeof luminol.runModuleScript == "function") {
                    luminol.runModuleScript(LuminolComponent);
                }
                else {
                    console.error('variable luminolModule in for luminolWebComponents needs to be an Function');
                }
            });
        };
        return LuminolComponentLoader;
    }());
    exports.LuminolComponentLoader = LuminolComponentLoader;
});
//# sourceMappingURL=luminol.componentLoader.js.map