import {
  Component,
  View
} from 'angular2/core';
import {
  Login
} from './login';
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
selector: 'navigation',
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES],
templateUrl: 'navigation.html',
styleUrls: ['style/verleihfix.css'],
})
export class Navigation {

}
