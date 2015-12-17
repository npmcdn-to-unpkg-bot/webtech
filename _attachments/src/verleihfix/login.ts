/// <reference path="fb/fbsdk.d.ts" />
import {
  Component
} from 'angular2/angular2';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouterOutlet,
  RouterLink,
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  pipes: [TranslatePipe]
})
export class Login {
  connected: boolean;
  username: string;
  logIn() {
    var service = this;
    FB.login(function(response) {
      service.checkLoginState();
    });
  }
  logOut() {
    var service = this;
    FB.logout(function(response) {
      service.checkLoginState();
    });
  }
  checkLoginState() {
    var login = this;
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        login.connected = true;
      } else if (response.status === 'not_authorized') {
        login.connected = false;
      } else {
        login.connected = false;
      }
    });
  }
  constructor() {
    this.username = "nobody";
    //window.fbAsyncInit = function() {
      FB.init({
        appId      : '196162784061592',
        xfbml      : true,
        version    : 'v2.5'
      });
    //};
      this.checkLoginState();
  }
}
