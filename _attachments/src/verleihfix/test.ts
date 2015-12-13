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
  selector: 'test'
})
@View({
  template: '<h1>Test</h1>'
})
export class Test {

}
