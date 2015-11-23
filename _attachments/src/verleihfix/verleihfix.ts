import {
  bootstrap,
  Component,
  CORE_DIRECTIVES,
  enableDevMode
} from 'angular2/angular2';
import {
  Http,
  HTTP_PROVIDERS
} from 'angular2/http';

@Component({
selector: 'verleihfix',
bindings: [CORE_DIRECTIVES,HTTP_PROVIDERS],
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css']
})
export class AppComponent {
  items: any;
  http; any;

  constructor(http: Http) {
    this.http = http;

    this.http.get('http://localhost:15984/item/_all_docs?include_docs=true').map(res => res.json().rows.map(res => res.doc)).subscribe(res => this.items = res);
  }

  rent() {
    var selected = this.items.filter((item) => item.selected);
    console.log(selected);
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }
}

enableDevMode();
bootstrap(AppComponent).catch(err => console.error(err));;
