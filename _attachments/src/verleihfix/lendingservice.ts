import {
  Injectable
} from 'angular2/angular2';
import {
  Http
} from 'angular2/http';

@Injectable()
export class LendingService {
  lendings: any;
  http: any;

  constructor(http:Http) {
    this.http = http;
    this.http.get('http://localhost:15984/lendings/_all_docs?include_docs=true')
      .map(res => res.json().rows.map(res => res.doc))
      .subscribe(res => this.lendings = res);
  }
  lend(items:any[]) {
    console.log('lending');
    console.log(items);
  }
}

