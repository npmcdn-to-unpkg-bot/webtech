import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import {
  Component,
  View,
  provide
} from 'angular2/core';
import {Grid} from './grid';

@Component({
selector: 'verleihfix',
templateUrl: 'verleihfix.html',
styleUrls: ['verleihfix.css'],
directives: [Grid]
})
export class Verleihfix {
  constructor() {
  }
}

bootstrap(Verleihfix, [HTTP_PROVIDERS]
  ).catch(err => console.error(err));
