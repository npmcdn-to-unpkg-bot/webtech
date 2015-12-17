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
import { Lendings } from './lendings';
import { Navigation } from './navigation';

@RouteConfig([
  {path: '/', redirectTo: '/grid' },
  {path: '/grid', as: 'Grid', component: Grid },
  {path: '/lendings', as: 'Lendings', component: Lendings }
])
@Component({
selector: 'verleihfix',
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css'],
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Navigation]
})
export class Verleihfix {
  constructor() {
  }
}

enableDevMode();
bootstrap(Verleihfix, [ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass:HashLocationStrategy})]
  ).catch(err => console.error(err));
