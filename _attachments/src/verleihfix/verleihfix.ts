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
  private items: Item[];
  private selected: boolean[];

  constructor(http: Http) {
    this.items = [
    {"id": 1, "vendor": "Zoom", "product": "H1"},
    {"id": 2, "vendor": "Zoom", "product": "H2"},
    {"id": 3, "vendor": "Zoom", "product": "H3"},
    {"id": 4, "vendor": "Zoom", "product": "H4"},
    {"id": 5, "vendor": "Zoom", "product": "H5"},
    {"id": 6, "vendor": "Zoom", "product": "H6"},
    {"id": 7, "vendor": "Zoom", "product": "H7"},
    {"id": 8, "vendor": "Zoom", "product": "H8"},
    {"id": 9, "vendor": "Zoom", "product": "H9"},
    {"id": 10, "vendor": "Zoom", "product": "H10"}
    ];
  }

  rent() {
    this.items.forEach(function(item) {
      if (this.selected[item.id]) console.log(item.product);
    });
  }

  toggleSelected(item) {
    this.selected[item.id] = !this.selected[item.id];
  }
}

bootstrap(AppComponent);
