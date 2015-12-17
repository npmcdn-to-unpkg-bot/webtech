import { EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
export declare class TranslateService {
    private http;
    /**
     * The lang currently used
     */
    currentLang: string;
    /**
     * An instance of the loader currently used
     */
    currentLoader: any;
    /**
     * An EventEmitter to listen to lang changes events
     * onLangChange.subscribe((params: {lang: string, translations: any}) => {
     *     // do something
     * });
     * @type {ng.EventEmitter}
     */
    onLangChange: EventEmitter<any>;
    private pending;
    private translations;
    private defaultLang;
    private langs;
    private parser;
    constructor(http: Http);
    /**
     * Use a static files loader
     */
    useStaticFilesLoader(prefix?: string, suffix?: string): void;
    /**
     * Sets the default language to use ('en' by default)
     * @param lang
     */
    setDefaultLang(lang: string): void;
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    use(lang: string): Observable<any>;
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    getTranslation(lang: string): any;
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     */
    setTranslation(lang: string, translations: Object): void;
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    getLangs(): string[];
    /**
     * Update the list of available langs
     */
    private updateLangs();
    /**
     * Gets the translated value of a key
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    get(key: string, interpolateParams?: Object): Observable<string>;
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    set(key: string, value: string, lang?: string): void;
    private changeLang(lang);
}
