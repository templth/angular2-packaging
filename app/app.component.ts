import {Component} from 'angular2/core';
import {CompaniesService} from './app.service';
import {Observable, Subject} from 'rxjs/Rx';

  @Component({
    selector: 'my-app',
    template: `
      <ul>
        <li *ngFor="#company of companies">{{company.name}}</li>
      </ul>
  `
  })
  export class AppComponent {
    private companies: any;

    constructor(private service: CompaniesService) {
      this.service.getCompanies().subscribe(
        (data) => {
          this.companies = data;
        }
      );
    }
  }