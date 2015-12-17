import {
  Component,
  View
} from 'angular2/angular2';
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
templateUrl: 'navigation.html',
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Login]
})
export class Navigation {

}
