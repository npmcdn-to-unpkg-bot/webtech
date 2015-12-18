import {HTTP_PROVIDERS} from 'angular2/http';
import {
  bootstrap,
  Component,
  View,
  provide,
  enableDevMode
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
import { Grid } from './grid';
import { Lendings } from './lendings';
import { Navigation } from './navigation';

@RouteConfig([
  //{path: '/', redirectTo: '/grid' },
  {path: '/', as: 'Start', component: Start },
  {path: '/start', as: 'Start', component: Start },
  {path: '/grid', as: 'Grid', component: Grid },
  {path: '/lendings', as: 'Lendings', component: Lendings },
  {path: '/login', as: 'Login', component: Login }
])
@Component({
selector: 'verleihfix',
templateUrl: 'verleihfix.html',
styleUrls: ['style/verleihfix.css'],
directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Navigation],
pipes: [TranslatePipe]
})
export class Verleihfix {
  translateService: any;
  constructor(translate: TranslateService) {
    this.translateService = translate;
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    translate.use('en');
    translate.setDefaultLang('en');
  }
  setLang(lang) {
    this.translateService.use(lang);
    this.translateService.getTranslation(lang);
  }
}

enableDevMode();
bootstrap(Verleihfix, [ROUTER_PROVIDERS, HTTP_PROVIDERS, TranslateService,
  provide(LocationStrategy, {useClass:HashLocationStrategy})]
  ).catch(err => console.error(err));
