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

@Component({
  selector: 'start'
})
@View({
  template: '<h2>{{ "WELCOME" }}</h2>'
})
export class Start {

}
