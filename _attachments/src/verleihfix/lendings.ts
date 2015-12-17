import {
  Component,
  View
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
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'lendings'
})
@View({
  template: '<h2>{{ "LENDINGS" | translate }}</h2>',
  pipes: [TranslatePipe]
})
export class Lendings {

}
