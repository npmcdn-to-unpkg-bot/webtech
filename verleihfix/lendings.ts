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
  lendings: any[];
  lendingService: LendingService;

  constructor(lendingService:LendingService) {
    this.selected = [];
    this.lendings = [];
    this.lendingService = lendingService;
    this.fetchLendings();
  }

  fetchLendings() {
    this.lendingService.getItems()
      .subscribe(res => this.buildLendings(res.json().rows.map(res => res.value)));
  }

  buildLendings(items) {
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items[i].reservations.length; j++) {
        var lending = items[i];
        var reservation = items[i].reservations[j];
        lending.start = reservation.start;
        lending.end = reservation.end;
        this.lendings.push(lending);
      }
    }
  }

  toggleSelected(lending) {
    this.selected[lending._id] = !this.selected[item._id];
  }

  delete() {
    var selectedItems = this.lendings.filter((lending) => this.selected[lending._id]);
    for (var i = 0; i < selectedItems.length; i++) {
      console.log(selectedItems[i]);
    }
  }
}
