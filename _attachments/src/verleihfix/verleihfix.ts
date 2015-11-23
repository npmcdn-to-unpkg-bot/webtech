import {
  bootstrap,
  Component,
  CORE_DIRECTIVES,
  enableDevMode
} from 'angular2/angular2';
import {
  Http,
  Headers,
  HTTP_PROVIDERS
} from 'angular2/http';
import {Item} from './item';

@Component({
selector: 'verleihfix',
bindings: [CORE_DIRECTIVES,HTTP_PROVIDERS],
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css']
})
export class AppComponent {
  items: Item[];
  http; any;

  constructor(http: Http) {
    this.items = [];
    this.http = http;

    //mock some entries for now
    this.items = [
      new Item(1, 'Zoom', 'H1', false),
      new Item(2, 'Zoom', 'H2', false),
      new Item(3, 'Zoom', 'H3', false),
      new Item(4, 'Zoom', 'H4', false),
      new Item(5, 'Zoom', 'H5', false)
    ];

    this.generateItems();
  }

  rent() {
    var selected = this.items.filter((item) => item.selected);
    console.log(selected);
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }

  getItems() {
    this.http.get('http://localhost:15984/').subscribe(response => console.log(response.text()));
  }

  generateItems() {
    this.http.put('http://localhost:15984/baseball').subscribe(response => console.log(response.text()));
  }
}

enableDevMode();
bootstrap(AppComponent).catch(err => console.error(err));;
