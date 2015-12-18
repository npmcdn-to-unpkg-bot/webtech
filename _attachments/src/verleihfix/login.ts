import {
  Component,
  View,
  FormBuilder,
  Validators
} from 'angular2/angular2';
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
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { LoginFB } from './loginFB';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS]
})
@View({
  templateUrl:  'login.html',
  styleUrls: ['style/verleihfix.css'],
  pipes: [TranslatePipe],
  directives: [LoginFB]
})
export class Login {
  loginForm: any;
  http: any;
  users: any;
  loginMessage:string;
  
  constructor(fb: FormBuilder, public router: Router, http:Http) {
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
  }
  
  doLogin(event) {
    console.log(this.loginForm.value);
    console.log(this.loginForm.value.username);
    event.preventDefault();
    
    for(var i = 0; i < this.users.length; i++) {
    
      //console.log(this.users[0].username);
      //console.log(this.loginForm.value.username);
      
      if(this.users[i].username == this.loginForm.value.username) {
        
        if(this.users[i].password == this.loginForm.value.password) {
          console.log("login successful");
          this.router.navigateByUrl('/start');
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
