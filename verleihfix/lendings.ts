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
import {
  LendingService
} from './lendingservice';
import {
  Lending
} from './lending';

@Component({
selector: 'lendings',
templateUrl: 'lendings.html',
providers: [LendingService]
})
export class Lendings {
  lendings: Lending;
  lendingService: LendingService;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    this.getLendings();
  }

  getLendings() {
    this.lendingService.getAvailableItems()
      .subscribe(res => this.lendings = res.json().rows.map(res => res.value));
  }

  delete(item:any) {
    console.log(item);
  }
}
