import {
  Component,
  View
} from 'angular2/core';
import {
  FormBuilder,
  Validators
} from 'angular2/common';
//import { RouterLink } from 'angular2/router';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouterOutlet,
  RouterLink,
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy,
  Router
} from 'angular2/router';
import {
  Http,
  Headers,
  HTTP_PROVIDERS
} from 'angular2/http';
import 'rxjs/add/operator/map';
import { LoginFB } from './loginFB';

@Component({
selector: 'login',
providers: [HTTP_PROVIDERS]
})
@View({
templateUrl:  'login.html',
styleUrls: ['style/verleihfix.css'],
directives: [LoginFB]
})
export class Login {
  loginForm: any;
  http: any;
  users: any;
  loginMessage:string;
  router: Router;
  userid: any;

  constructor(fb: FormBuilder, router: Router, http:Http) {
    this.router = router;
    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.http = http;
    this.http.get('/verleihfix/_design/verleihfix/_view/users')
      .map(res => res.json().rows.map(res => res.value))
      .subscribe(res => this.users = res);
    this.loginMessage = "";
    //this.loggedIn = false;
    this.userid = 0;
  }

  doLogin(event) {
    event.preventDefault();

    for(var i = 0; i < this.users.length; i++) {
      if(this.users[i].username == this.loginForm.value.username) {
        if(this.users[i].password == this.loginForm.value.password) {
          console.log("login successful");
          this.router.navigateByUrl('/start');
          this.userid = this.users[i].id;
          break;
        } else {
          console.log("login failed");
          this.loginMessage = "wrong password";
          break;
        }
      }
      this.loginMessage = "wrong username";
    }
  }
}
