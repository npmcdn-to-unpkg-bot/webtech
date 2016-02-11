import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import {TranslateService, TranslatePipe} from './ng2-translate';
import {
  Component,
  View,
  Injectable,
  provide
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
import { Grid } from './grid';
import { Lendings } from './lendings';
import { Navigation } from './navigation';
import { Start } from './start';
import { Login } from './login';
import { LoginFB } from './loginFB';
import { LoginService } from './loginservice';

@RouteConfig([
  {path: '/', as: 'Start', component: Start },
  {path: '/start', as: 'Start', component: Start },
  {path: '/grid', as: 'Grid', component: Grid },
  {path: '/lendings', as: 'Lendings', component: Lendings },
  {path: '/login', as: 'Login', component: Login },
  {path: '/loginFB', as: 'LoginFB', component: LoginFB }
])
@Component({
selector: 'verleihfix',
templateUrl: '../verleihfix.html',
styleUrls: ['style/verleihfix.css'],
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Navigation, Grid],
providers: [LoginService],
pipes: [TranslatePipe]
})
export class Verleihfix {
  loggedIn: boolean = false;
  constructor(translate: TranslateService) {
    var userLang = navigator.language.split('-')[0];
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
}

bootstrap(Verleihfix, [ROUTER_PROVIDERS, HTTP_PROVIDERS, TranslateService, LoginService,
  provide(LocationStrategy, {useClass:HashLocationStrategy})]
  ).catch(err => console.error(err));
