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
styleUrls: ['verleihfix.css']
})
export class Grid {
  items: any;
  lendingService: any;
  starttime: number;
  endtime: number;

  constructor(lendingService:LendingService) {
    this.lendingService = lendingService;
    this.lendingService.getItems()
      .subscribe(res => this.items = res.json().rows.map(res => res.value));
  }

  rent(start:string, end:string) {
    var items = this.items.filter((item) => item.selected);
    for (var i = 0; i < items.length; i++) {
      this.lendingService.rent({'type': 'lending', 'itemID': items[i]._id, 'start': start, 'end': end})
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('rent successfull')
            );
      items[i].selected = false;
    }
  }

  toggleSelected(item) {
    if (!item.disabled) item.selected = !item.selected;
  }
}