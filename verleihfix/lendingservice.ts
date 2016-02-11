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
import { LoginService } from './loginservice';

@Injectable()
export class LendingService {
  lendings: Lending[];
  http: any;
  uuids: number[];
  public serverURL: any;
  public appURL: any;
  public fullAppURL: any;
  loginservice: LoginService;

  constructor(http:Http, loginservice:LoginService) {
    this.loginservice = loginservice;
    this.serverURL = "http://michael.virtuos.uni-osnabrueck.de:15984/";
    this.appURL = "verleihfix/_design/verleihfix/";
    this.fullAppURL = this.serverURL + this.appURL;
    this.http = http;
    this.fetchUUIDs();
  }
  rent(item, startDate, endDate) {
    if (!item.reservations) item.reservations = [];
    item.reservations.push({"id": this.getUUID(), "userid": this.loginservice.userid, "start": startDate, "end": endDate});
    console.log(item);
    return this.http.put(this.serverURL + "verleihfix/" + item._id,
    JSON.stringify(item),
    { headers: new Headers({'Content-Type': 'application/json'})
    });
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
  update(item) {
    return this.http.put(this.serverURL + "verleihfix/" + item._id,
    JSON.stringify(item),
    { headers: new Headers({'Content-Type': 'application/json'})
    });
  }
}

