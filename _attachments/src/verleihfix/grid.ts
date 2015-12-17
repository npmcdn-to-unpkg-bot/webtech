import {
  Component,
  View,
  CORE_DIRECTIVES
} from 'angular2/angular2';
import {
  Http,
  Headers,
  HTTP_PROVIDERS
} from 'angular2/http';
import {
  LendingService
} from './lendingservice';
import {
  Lending
} from './lending';

@Component({
selector: 'grid',
directives: [CORE_DIRECTIVES],
providers: [HTTP_PROVIDERS, LendingService],
templateUrl: 'grid.html',
styleUrls: ['style/verleihfix.css']
})
export class Grid {
  items: any;
  http: any;
  lendingService: any;
  starttime: number;
  endtime: number;

  constructor(http:Http, lendingService:LendingService) {
    this.http = http;
    this.lendingService = lendingService;
    this.http.get('/verleihfix/_design/verleihfix/_view/items')
      .map(res => res.json().rows.map(res => res.value))
      .subscribe(res => this.items = res);
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
