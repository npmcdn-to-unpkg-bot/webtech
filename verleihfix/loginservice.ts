import {Injectable} from 'angular2/core';
@Injectable()
export class LoginService {
  public userid: number;
  constructor() {
    this.userid = 0;
  }
}
