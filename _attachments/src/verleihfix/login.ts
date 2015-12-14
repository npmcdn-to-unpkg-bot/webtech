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
  HashLocationStrategy
} from 'angular2/router';

@Component({
  selector: 'login'
})
@View({
  templateUrl:  'login.html'
})
export class Login {
  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  doLogin(event) {
    console.log(this.loginForm.value);
    event.preventDefault();
  }
}
