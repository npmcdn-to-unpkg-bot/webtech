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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromArray.js');
require('rxjs/add/operator/share.js');
var translate_parser_1 = require('./translate.parser');
var TranslateStaticLoader = (function () {
    function TranslateStaticLoader(http, prefix, suffix) {
        this.sfLoaderParams = { prefix: 'i18n', suffix: '.json' };
        this.http = http;
        this.configure(prefix, suffix);
    }
    /**
     * Defines the prefix & suffix used for getTranslation
     * @param prefix
     * @param suffix
     */
    TranslateStaticLoader.prototype.configure = function (prefix, suffix) {
        this.sfLoaderParams.prefix = prefix ? prefix : this.sfLoaderParams.prefix;
        this.sfLoaderParams.suffix = suffix ? suffix : this.sfLoaderParams.suffix;
    };
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    TranslateStaticLoader.prototype.getTranslation = function (lang) {
        return this.http.get(this.sfLoaderParams.prefix + "/" + lang + this.sfLoaderParams.suffix)
            .map(function (res) { return res.json(); });
    };
    TranslateStaticLoader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, String, String])
    ], TranslateStaticLoader);
    return TranslateStaticLoader;
})();
var TranslateService = (function () {
    function TranslateService(http) {
        this.http = http;
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * An EventEmitter to listen to lang changes events
         * onLangChange.subscribe((params: {lang: string, translations: any}) => {
         *     // do something
         * });
         * @type {ng.EventEmitter}
         */
        this.onLangChange = new core_1.EventEmitter();
        this.translations = {};
        this.defaultLang = 'en';
        this.parser = new translate_parser_1.Parser();
        this.useStaticFilesLoader();
    }
    /**
     * Use a static files loader
     */
    TranslateService.prototype.useStaticFilesLoader = function (prefix, suffix) {
        this.currentLoader = new TranslateStaticLoader(this.http, prefix, suffix);
    };
    /**
     * Sets the default language to use ('en' by default)
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        this.defaultLang = lang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        // check if this language is available
        if (typeof this.translations[lang] === 'undefined') {
            // not available, ask for it
            var pending = this.getTranslation(lang);
            pending.subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return Observable_1.Observable.of(this.translations[lang]);
        }
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang) {
        var _this = this;
        this.pending = this.currentLoader.getTranslation(lang).share();
        this.pending.subscribe(function (res) {
            _this.translations[lang] = res;
            _this.updateLangs();
            _this.pending = undefined;
        });
        return this.pending;
    };
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     */
    TranslateService.prototype.setTranslation = function (lang, translations) {
        this.translations[lang] = translations;
        this.updateLangs();
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.langs = Object.keys(this.translations);
    };
    /**
     * Gets the translated value of a key
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        // check if we are loading a new translation to use
        if (this.pending) {
            return this.pending.map(function (res) { return _this.parser.interpolate(res[key], interpolateParams) || key; });
        }
        else {
            return Observable_1.Observable.of(this.translations && this.translations[this.currentLang]
                ? this.parser.interpolate(this.translations[this.currentLang][key], interpolateParams) : key || key);
        }
    };
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = value;
        this.updateLangs();
    };
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.next({ lang: lang, translations: this.translations[lang] });
    };
    TranslateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TranslateService);
    return TranslateService;
})();
exports.TranslateService = TranslateService;
//# sourceMappingURL=translate.service.js.map