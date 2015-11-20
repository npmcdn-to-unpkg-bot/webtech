import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
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
  selected: boolean[];

  constructor(http: Http) {
    this.items = [];
    this.selected = [];

    //mock some entries for now
    this.items = [
      new Item(1, 'Zoom', 'H1'),
      new Item(2, 'Zoom', 'H2'),
      new Item(3, 'Zoom', 'H3'),
      new Item(4, 'Zoom', 'H4'),
      new Item(5, 'Zoom', 'H5')
    ];
  }

  rent() {
    /*
    for (var item in this.items) {
      if (item.selected) console.log(item.product);
      console.log(item.selected);
    }
    */
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }
}

bootstrap(AppComponent);
