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
  template: '<h2>Welcome to Verleihfix!</h2>'
})
export class Start {

}
