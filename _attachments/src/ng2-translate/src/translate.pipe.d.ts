import { PipeTransform } from 'angular2/core';
import { TranslateService } from './translate.service';
export declare class TranslatePipe implements PipeTransform {
    translate: TranslateService;
    value: string;
    lastKey: string;
    constructor(translate: TranslateService);
    updateValue(key: string, interpolateParams?: Object): void;
    transform(query: string, args: any[]): any;
}
