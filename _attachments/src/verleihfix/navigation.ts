import {
  Component,
  View
} from 'angular2/angular2';
import {
  LoginFB
} from './loginFB';
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
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, LoginFB],
pipes: [TranslatePipe]
templateUrl: 'navigation.html',
styleUrls: ['style/verleihfix.css'],
})
export class Navigation {

}
