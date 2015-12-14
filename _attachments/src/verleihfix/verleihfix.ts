import {
  bootstrap,
  Component,
  View,
  provide,
  enableDevMode
} from 'angular2/angular2';
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
import { Start } from './start';
import { Test } from './test';
import { Login } from './login';

@RouteConfig([
  {path: '/', as: 'Start', component: Start },
  {path: '/test', as: 'Test', component: Test },
  {path: '/grid', as: 'Grid', component: Grid },
  {path: '/login', as: 'Login', component: Login }
])
@Component({
selector: 'verleihfix'
//directives: 'ROUTE_DIRECTIVES'
})
@View({
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES],
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css']
})
export class Verleihfix {
  //navItem any;
  constructor() {
  }
  //toggleActive() {}
}

enableDevMode();
bootstrap(Verleihfix, [ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass:HashLocationStrategy})]
  ).catch(err => console.error(err));;
