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
  selected: boolean;
  lendingService: any;
  starttime: number;
  endtime: number;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    setInterval(() => this.fetchItems(), 5000);
    this.fetchItems();
  }

  fetchItems() {
    this.lendingService.getAvailableItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
  }

  rent(start:string, end:string) {
    var selectedItems = this.items.filter((item) => this.selected(item._id));
    for (var i = 0; i < selectedItems.length; i++) {
      this.lendingService.rent({'type': 'lending', 'itemID': selectedItems[i]._id, 'start': start, 'end': end})
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('rent successfull')
            );
      items[i].lend = true;
    }
  }

  toggleSelected(item) {
    this.selected[item._id] = !this.selected[item._id];
    console.log(this.selected);
  }
}
