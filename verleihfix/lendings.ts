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
  selected: boolean[];
  lendings: any;
  lendingService: LendingService;

  constructor(lendingService:LendingService) {
    this.selected = [];
    this.lendingService = lendingService;
    this.fetchLendings();
  }

  fetchLendings() {
    this.lendingService.getLendings()
      .subscribe(res => this.lendings = res.json().rows.map(res => res.value));
  }

  toggleSelected(item) {
    this.selected[item._id] = !this.selected[item._id];
  }

  delete() {
    var selectedItems = this.lendings.filter((lending) => this.selected[lending._id]);
    for (var i = 0; i < selectedItems.length; i++) {
      console.log(selectedItems[i]);
    }
  }
}
