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
  items: any[];
  lendingService: LendingService;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    this.selected = [];
    this.items = [];
    this.fetchItems();
  }

  fetchItems() {
    this.lendingService.getItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
  }

  buildLendings(items) {
    this.items = items;
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; items[i].reservations && j < items[i].reservations.length; j++) {
        var lending = items[i];
        var reservation = items[i].reservations[j];
        lending.lendingid = reservation._id;
        lending.start = reservation.start;
        lending.end = reservation.end;
        this.lendings.push(lending);
      }
    }
  }

  toggleSelected(lending) {
    this.selected[lending.lendingid] = !this.selected[lending.lendingid];
  }

  delete() {
    var selectedItems = this.lendings.filter((lending) => this.selected[lending.lendingid]);
    for (var i = 0; i < selectedItems.length; i++) {
      for (var j = 0; j < this.items.length; j++) {
        for (var k = 0; this.items[j].reservations && k < this.items[j].reservations.length; k++) {
          if (this.items[j].reservations[k]._id == selectedItems[i].lendingid) {
            delete this.items[j].reservations[k];
            this.lendingService.update(this.items[k])
              .subscribe(
                  data => console.log(data),
                  err => console.log(err),
                  () => console.log('delete successfull')
                  );
          }
        }
      }
    }
  }
}
