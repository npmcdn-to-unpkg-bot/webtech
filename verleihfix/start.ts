import {
  Component,
  View
} from 'angular2/core';
//import { RouterLink } from 'angular2/router';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouterOutlet,
  RouterLink,
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';
import {TranslateService, TranslatePipe} from './ng2-translate';

@Component({
  selector: 'start',
  template: '<h2>{{ "WELCOME" | translate }}</h2>',
  pipes: [TranslatePipe]
})
export class Start {

}
