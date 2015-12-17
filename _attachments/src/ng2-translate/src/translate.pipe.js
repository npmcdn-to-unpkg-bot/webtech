var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var translate_service_1 = require('./translate.service');
var TranslatePipe = (function () {
    function TranslatePipe(translate) {
        this.value = '';
        this.translate = translate;
    }
    TranslatePipe.prototype.updateValue = function (key, interpolateParams) {
        var _this = this;
        this.translate.get(key, interpolateParams).subscribe(function (res) {
            _this.value = res ? res : key;
        });
    };
    TranslatePipe.prototype.transform = function (query, args) {
        var _this = this;
        if (query.length === 0) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (this.lastKey && query === this.lastKey) {
            return this.value;
        }
        var interpolateParams;
        if (args.length && args[0] !== null) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1},
                // which is why we might need to change it to real JSON objects such as {"n":1}
                try {
                    interpolateParams = JSON.parse(args[0].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // set the value
        this.updateValue(query, interpolateParams);
        // subscribe to onLangChange event, in case the language changes
        this.translate.onLangChange.subscribe(function (params) {
            _this.updateValue(query, interpolateParams);
        });
        return this.value;
    };
    TranslatePipe = __decorate([
        core_1.Injectable(),
        core_1.Pipe({
            name: 'translate',
            pure: false // required to update the value when the promise is resolved
        }), 
        __metadata('design:paramtypes', [translate_service_1.TranslateService])
    ], TranslatePipe);
    return TranslatePipe;
})();
exports.TranslatePipe = TranslatePipe;
//# sourceMappingURL=translate.pipe.js.map