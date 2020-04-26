"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function init(opt) {
    return Crescendo.of(opt);
}
exports.init = init;
;
var Crescendo = /** @class */ (function () {
    function Crescendo(_a) {
        var _this = this;
        var categories = _a.categories, _b = _a.registering, registering = _b === void 0 ? {} : _b;
        this.map = this.buildMap(categories);
        Object.entries(registering)
            .forEach(function (_a) {
            var cat = _a[0], registeredIds = _a[1];
            registeredIds.forEach(function (_a) {
                var elemId = _a.elemId, hideOnInput = _a.hideOnInput;
                _this.register(cat, { elemId: elemId, hideOnInput: hideOnInput });
            });
        });
    }
    Crescendo.prototype.buildMap = function (categories) {
        return Object.entries(categories)
            .map(function (_a) {
            var catName = _a[0], messages = _a[1];
            var obj = {};
            obj[catName] = { messages: messages, elements: {} };
            return obj;
        }).reduce(function (acc, curr) { return (__assign(__assign({}, acc), curr)); });
    };
    Crescendo.prototype.register = function (categoryName, _a) {
        var _this = this;
        var elemId = _a.elemId, _b = _a.hideOnInput, hideOnInput = _b === void 0 ? true : _b;
        var elem = document.getElementById(elemId);
        if (!elem) {
            console.error("Element of id " + elemId + " was not found");
            return;
        }
        if (!this.map[categoryName]) {
            return;
        }
        if (this.map[categoryName].elements[elemId]) {
            console.error("Element of id " + elemId + " already registered");
            return;
        }
        if (elem) {
            var errorElement = this.createErrorElement();
            elem.insertAdjacentElement('afterend', errorElement);
            this.map[categoryName].elements[elemId] = { hideOnInput: hideOnInput, msgIdx: 0, errorElement: errorElement };
        }
        if (hideOnInput) {
            elem.addEventListener('input', function () {
                _this.hideError(categoryName, elemId);
            });
        }
        return this;
    };
    Crescendo.prototype.next = function (categoryName, elementId) {
        if (this.map[categoryName]) {
            var elem = this.map[categoryName].elements[elementId];
            if (elem) {
                elem.errorElement.innerHTML = this.map[categoryName].messages[elem.msgIdx];
                elem.errorElement.style.display = 'block';
                if (elem.msgIdx < this.map[categoryName].messages.length - 1) {
                    elem.msgIdx++;
                }
            }
        }
        return this;
    };
    Crescendo.prototype.createErrorElement = function () {
        var errorElem = document.createElement('p');
        errorElem.style.display = 'none';
        return errorElem;
    };
    Crescendo.prototype.hideError = function (categoryName, elemId) {
        if (this.map[categoryName]) {
            var elem = this.map[categoryName].elements[elemId];
            if (elem) {
                elem.errorElement.style.display = 'none';
            }
        }
        return this;
    };
    Crescendo.of = function (opt) {
        return new Crescendo(opt);
    };
    return Crescendo;
}());
