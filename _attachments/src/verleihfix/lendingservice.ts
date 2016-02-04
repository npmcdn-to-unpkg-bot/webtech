import {
  Injectable
} from 'angular2/core';
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
  public serverURL: any;
  public appURL: any;

  constructor(http:Http) {
    this.serverURL = "http://michael.virtuos.uni-osnabrueck.de:15984/";
    this.appURL = "/verleihfix/_design/verleihfix/";
    this.http = http;
    this.http.get(this.serverURL + this.appURL + '/_view/lendings')
      .subscribe(res => this.lendings = res.json().rows.map(res => res.value));
    this.http.get(this.serverURL+'/_uuids?count=100')
      .subscribe(res => this.uuids = res.json().uuids);
  }
  rent(lending:Lending) {
    return this.http.put(this.serverURL + '/verleihfix/' + this.uuids.pop(),
    JSON.stringify(lending),
    { headers: new Headers({'Content-Type': 'application/json'})
    });
  }
  lend(item:any) {
    return this.http.put(this.serverURL + '/verleihfix/' + item._id,
    JSON.stringify(item),
    { headers: new Headers({'Content-Type': 'application/json'})
    });
  }
  getAvailableItems() {
    return this.http.get(this.serverURL + this.appURL + '/_view/availableitems')
  }
  getItems() {
    return this.http.get(this.serverURL + this.appURL + '/_view/items')
  }
}

