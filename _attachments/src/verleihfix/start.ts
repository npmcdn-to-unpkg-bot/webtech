import {
  Component,
  View
} from 'angular2/angular2';
//import { RouterLink } from 'angular2/router';
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
  selector: 'start'
})
@View({
  template: '<h1>Start</h1>'
})
export class Start {

}
