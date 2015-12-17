import {
  Injectable
} from 'angular2/angular2';
import {
  Http,
  Headers
} from 'angular2/http';
import {
  Lending
} from './lending';

@Injectable()
export class LendingService {
  lendings: Lending[];
  http: any;
  uuids: number[];

  constructor(http:Http) {
    this.http = http;
    this.http.get('/verleihfix/_design/verleihfix/_view/lendings')
      .map(res => res.json().rows.map(res => res.doc))
      .subscribe(res => this.lendings = res);
    this.http.get('/_uuids?count=100')
      .map(res => res.json().uuids)
      .subscribe(res => this.uuids = res);
  }
  rent(lending:Lending) {
    console.log(lending);
    return this.http.put('/verleihfix/' + this.uuids.pop(),
    JSON.stringify(lending),
    { headers: new Headers({'Content-Type': 'application/json'})
    })
    .map(res => res.json());
  }
}

