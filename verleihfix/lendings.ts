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

  toggleSelected(reservation) {
    if (reservation) this.selected[reservation.id] = !this.selected[reservation.id];
  }

  // TODO this fails for multiple reservations selected for one item
  delete() {
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; this.items[i].reservations && j < this.items[i].reservations.length; j++) {
        if (this.items[i].reservations[j] && this.selected[this.items[i].reservations[j].id]) {
          this.selected[this.items[i].reservations[j].id] = false;
          var newReservations = this.items[i].reservations.slice(0, j).concat(this.items[i].reservations.slice(j + 1, this.items[i].reservations.length - j));
          this.items[i].reservations = newReservations;
          this.lendingService.update(this.items[i])
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
