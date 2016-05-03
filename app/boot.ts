import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import {CompaniesService} from './app.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, CompaniesService]);