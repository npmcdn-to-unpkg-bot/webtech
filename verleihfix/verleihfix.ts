import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import {
  Component,
  View,
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
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css'],
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Navigation, Grid]
})
export class Verleihfix {
  loggedIn: boolean = false;
  constructor() {
  }
}

bootstrap(Verleihfix, [ROUTER_PROVIDERS, HTTP_PROVIDERS,
  provide(LocationStrategy, {useClass:HashLocationStrategy})]
  ).catch(err => console.error(err));
