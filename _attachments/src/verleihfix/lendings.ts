import {
  Component,
  View
} from 'angular2/core';
import {
  Http,
  Headers,
  HTTP_PROVIDERS
} from 'angular2/http';
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
selector: 'lendings',
templateUrl: 'lendings.html'
})
export class Lendings {
  items: any;
  http: any;

  constructor(http:Http) {
    this.http = http;
    this.http.get('/verleihfix/_design/verleihfix/_view/lendings')
      .map(res => res.json().rows.map(res => res.value))
      .subscribe(res => console.log(res));
      //.subscribe(res => this.items = res);
  }

  delete(item:any) {
    console.log(item);
  }
}
