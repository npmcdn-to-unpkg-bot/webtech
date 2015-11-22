import {
  bootstrap,
  Component,
  CORE_DIRECTIVES
} from 'angular2/angular2';
import {
  Http,
  HTTP_PROVIDERS
} from 'angular2/http';
import {Item} from './item';

@Component({
selector: 'verleihfix',
directives: [CORE_DIRECTIVES],
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css'],
viewProviders: [HTTP_PROVIDERS]
})
export class AppComponent {
  items: Item[];

  constructor(http: Http) {
    this.items = [];

    //mock some entries for now
    this.items = [
      new Item(1, 'Zoom', 'H1', false),
      new Item(2, 'Zoom', 'H2', false),
      new Item(3, 'Zoom', 'H3', false),
      new Item(4, 'Zoom', 'H4', false),
      new Item(5, 'Zoom', 'H5', false)
    ];
  }

  rent() {
    var selected = this.items.filter((item) => item.selected);
    console.log(selected);
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }
}

bootstrap(AppComponent);
