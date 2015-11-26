import {
  bootstrap,
  Component,
  View,
  enableDevMode
} from 'angular2/angular2';
import {
  Grid
} from './grid';

@Component({
selector: 'verleihfix',
templateUrl: 'verleihfix.html',
directives: [Grid],
styleUrls: ['style/verleihfix.css']
})
export class Verleihfix {
  constructor() {
  }
}

enableDevMode();
bootstrap(Verleihfix).catch(err => console.error(err));;
