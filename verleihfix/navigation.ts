import {
  Component,
  View
} from 'angular2/core';
import {
  Login
} from './login';
import {
  LoginFB
} from './loginFB';
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
selector: 'navigation',
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, LoginFB],
templateUrl: 'navigation.html',
styleUrls: ['style/verleihfix.css'],
pipes: [TranslatePipe]
})
export class Navigation {
  translateService: any;

  constructor(translate: TranslateService) {
    this.translateService = translate;
  }

  setLang(lang) {
    this.translateService.use(lang);
    this.translateService.getTranslation(lang);
  }
}
