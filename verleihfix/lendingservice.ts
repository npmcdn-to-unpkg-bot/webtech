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
    this.serverURL = "http://michael.virtuos.uni-osnabrueck.de:5984/";
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
    return this.http.get(this.fullAppURL + '/_view/reservations');
  }
  deleteLending(item:Item) {
    console.log(item);
    //var bla;
    //this.http.delete(this.serverURL + "verleihfix/" + item._id + "?rev=" + item._rev);
    //console.log(this.http.get(this.serverURL + "verleihfix/" + item._id));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //this.http.post(this.serverURL + 'verleihfix/', '{"_id": "f21a20482fa5447c39dd6fcf6015ab45", "_rev":"1-bf8ba42b947e93dd6e8e81a760d8d124", "test": "true"}', {headers:headers}).map(res => res.json())
    
    console.log(JSON.stringify(item));
    this.http.post(this.serverURL + 'verleihfix/', JSON.stringify(item), {headers:headers}).map(res => res.json())
    .subscribe(
      data => console.log(data.id_token),
      err => console.log(err),
      () => console.log('Deletion Complete')
    );
  }
}

