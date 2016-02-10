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
  newItem: any;

  constructor(lendingService:LendingService) {
    this.selected = [];
    this.lendingService = lendingService;
    setInterval(() => this.fetchLendings(), 5000);
    this.fetchLendings();
  }

  fetchLendings() {
    this.lendingService.getLendings()
      .subscribe(res => this.lendings = res.json().rows.map(res => res.value));
  }

  toggleSelected(item) {
    this.selected[item.id] = !this.selected[item.id];
  }

  delete() {
    var selectedItems = this.lendings.filter((lending) => this.selected[lending.id]);
    for (var i = 0; i < selectedItems.length; i++) {
      this.newItem = JSON.parse(JSON.stringify(selectedItems[i].item));
      this.newItem.reservations = [];
      var k = 0;
      for(var j = 0; j < selectedItems[i].item.reservations.length; j++) {
        if(selectedItems[i].item.reservations[j].id != selectedItems[i].id) {
          this.newItem.reservations[k] = selectedItems[i].item.reservations[j];
          k++;
        }
      }
      if(k==0) {
        this.newItem.reserved = "false";
      }
      this.lendingService.deleteLending(this.newItem);
      this.fetchLendings();
    }
  }
}
