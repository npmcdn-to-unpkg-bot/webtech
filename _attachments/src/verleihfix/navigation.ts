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
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
selector: 'navigation',
templateUrl: 'navigation.html',
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Login],
pipes: [TranslatePipe]
})
export class Navigation {

}
