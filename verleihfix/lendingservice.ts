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
import {
  Item
} from './item';

@Injectable()
export class LendingService {
  lendings: Lending[];
  http: any;
  uuids: number[];
  public serverURL: any;
  public appURL: any;
  public fullAppURL: any;

  constructor(http:Http) {
    this.serverURL = "http://michael.virtuos.uni-osnabrueck.de:15984/";
    this.appURL = "verleihfix/_design/verleihfix/";
    this.fullAppURL = this.serverURL + this.appURL;
    this.http = http;
    this.fetchUUIDs();
  }
  rent(lending:Lending) {
    return this.http.put(this.serverURL + "verleihfix/" + this.getUUID(),
    JSON.stringify(lending),
    { headers: new Headers({'Content-Type': 'application/json'})
    });
  }
  getAvailableItems() {
    return this.http.get(this.fullAppURL + '/_view/availableitems');
  }
  getItems() {
    return this.http.get(this.fullAppURL + '/_view/items');
  }
  fetchUUIDs() {
    this.http.get(this.serverURL + '/_uuids?count=100')
      .subscribe(res => this.uuids = res.json().uuids);
  }
  getUUID() {
    //TODO check if this.uuids is empty and request new ones if necessary
    return this.uuids.pop();
  }
  getLendings() {
    return this.http.get(this.fullAppURL + '/_view/lendings');
  }
}

