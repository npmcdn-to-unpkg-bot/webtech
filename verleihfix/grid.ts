import {
  Component,
  View
} from 'angular2/core';
import {
  LendingService
} from './lendingservice';
import {
  Lending
} from './lending';

@Component({
selector: 'grid',
providers: [LendingService],
templateUrl: 'grid.html',
styleUrls: ['style/verleihfix.css']
})
export class Grid {
  items: any;
  selected: boolean[];
  available: boolean[];
  lendingService: any;
  startDate: Date;
  endDate: Date;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    setInterval(() => this.fetchItems(), 5000);
    this.fetchItems();
    this.selected = [];
    this.available = [];
  }

  fetchItems() {
    this.lendingService.getItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
  }

  rent() {
    var selectedItems = this.items.filter((item) => this.selected[item._id]);
    for (var i = 0; i < selectedItems.length; i++) {
      this.lendingService.rent(selectedItems[i], this.startDate, this.endDate)
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('rent successfull')
            );
    }
  }

  toggleSelected(item) {
    this.selected[item._id] = !this.selected[item._id];
  }

  refresh(starttime, endtime) {
    this.startDate = new Date(starttime);
    this.endDate = new Date(endtime);
    this.refreshAvailable();
  }

  refreshAvailable() {
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < this.items[i].reservations.length; j++) {
        var r = this.items[i].reservations[j];
        var start = new Date(r.start);
        var end = new Date(r.end);
        if ((this.startDate > start && this.startDate < end)
            || (this.endDate > start && this.endDate < end)
            || (this.startDate < start && this.endDate > end)) {
          this.available[this.items[i]._id] = false;
          console.log("not ava");
        }
        else {
          this.available[this.items[i]._id] = true;
          console.log("is ava");
        }
      }
    }
  }
}
