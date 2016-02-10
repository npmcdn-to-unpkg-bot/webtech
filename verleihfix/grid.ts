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
  lendingService: any;
  starttime: number;
  endtime: number;
  newItem: any;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    setInterval(() => this.fetchItems(), 5000);
    this.fetchItems();
    this.selected = [];
  }

  fetchItems() {
    this.lendingService.getAvailableItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
  }

  rent(start:string, end:string) {
    var selectedItems = this.items.filter((item) => this.selected[item._id]);
    for (var i = 0; i < selectedItems.length; i++) {
      this.newItem = JSON.parse(JSON.stringify(selectedItems[i]));
      this.newItem.reservations = [];
      var k = 0;
      var len = selectedItems[i].reservations.length;
      for(var j = 0; j < len; j++) {
        this.newItem.reservations[j] = selectedItems[i].reservations[j];
      }
      var lendID: string;
      lendID = this.lendingService.getUUID();
      this.newItem.reservations[len] = {"id": lendID, "start": start, "end": end};
      
      this.newItem.reserved = "true";
      this.lendingService.reserveItem(this.newItem);
      this.fetchItems();
    }
  }

  toggleSelected(item) {
    this.selected[item._id] = !this.selected[item._id];
  }

  refresh(starttime, endtime) {
    this.starttime = starttime;
    this.endtime = endtime;
  }
}
