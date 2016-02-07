/// <reference path="fb/fbsdk.d.ts" />
import {
  Component
} from 'angular2/core';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouterOutlet,
  RouterLink,
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

@Component({
  selector: 'loginFB',
  templateUrl: 'loginFB.html'
})
export class LoginFB {
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
        login.getUserinfo();
      } else if (response.status === 'not_authorized') {
        login.connected = false;
      } else {
        login.connected = false;
      }
    });
  }
  getUserinfo() {
    var login = this;
    FB.api('/me', 'get',function(response) {
      console.log(response);
      var asd;
      asd = response;
      login.username = asd.name;
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