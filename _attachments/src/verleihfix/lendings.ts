import {
  Component,
  View
} from 'angular2/core';
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
  selector: 'lendings'
})
@View({
  template: '<h2>{{ "LENDINGS" }}</h2>'
})
export class Lendings {

}
