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

  constructor(http:Http, lendings:LendingService) {
    this.http = http;
    this.http.get('http://localhost:15984/items/_all_docs?include_docs=true')
      .map(res => res.json().rows.map(res => res.doc))
      .subscribe(res => this.items = res);
  }

  rent() {
    var selected = this.items.filter((item) => item.selected);
    console.log(selected);
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }
}
