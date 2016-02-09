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
      console.log(selectedItems[i].item.reservations);
      for(var j = 0; j < selectedItems[i].item.reservations.length; j++) {
        console.log(selectedItems[i].item.reservations[j].id);
        console.log(selectedItems[i].id);
        if(selectedItems[i].item.reservations[j].id != selectedItems[i].id) {
          this.newItem.reservations[k] = selectedItems[i].item.reservations[j];
          k++;
        }
      }
      this.lendingService.deleteLending(this.newItem);
      console.log(selectedItems[i]);
      console.log(this.newItem);
    }
  }
}
