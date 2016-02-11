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
import {TranslateService, TranslatePipe} from './ng2-translate';

@Component({
selector: 'grid',
providers: [LendingService],
templateUrl: 'grid.html',
styleUrls: ['style/verleihfix.css'],
pipes: [TranslatePipe]
})
export class Grid {
  items: any[];
  selected: boolean[];
  unavailable: boolean[];
  lendingService: any;
  startDate: Date;
  endDate: Date;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    this.startDate = new Date("2016-02-11"); //TODO bind and initialize this for today
    this.endDate = new Date("2016-02-11"); //TODO bind and initialize this for today
    this.selected = [];
    this.items = [];
    this.unavailable = [];
    setInterval(() => this.fetchItems(), 5000);
    this.fetchItems();
  }

  fetchItems() {
    this.lendingService.getItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
    this.refreshUnAvailable();
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
      this.selected[selectedItems[i]._id] = false;
    }
    this.fetchItems();
  }

  toggleSelected(item) {
    this.selected[item._id] = !this.selected[item._id];
  }

  refresh(starttime, endtime) {
    this.startDate = new Date(starttime);
    this.endDate = new Date(endtime);
    this.refreshUnAvailable();
  }

  refreshUnAvailable() {
    for (var i = 0; i < this.items.length; i++) {
      this.unavailable[this.items[i]._id] = false;
      for (var j = 0; this.items[i].reservations && j < this.items[i].reservations.length; j++) {
        var r = this.items[i].reservations[j];
        var start = new Date(r.start);
        var end = new Date(r.end);
        if ((this.startDate >= start && this.startDate <= end)
            || (this.endDate >= start && this.endDate <= end)
            || (this.startDate <= start && this.endDate >= end)) {
          this.unavailable[this.items[i]._id] = true;
        }
      }
    }
  }
}
