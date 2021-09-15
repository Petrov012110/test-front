import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyModel } from '../shared/models/company.model';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./styles/company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  public companyObject!: CompanyModel;

  constructor(
    private _route: Router,
    ) {
      const navigation = this._route.getCurrentNavigation();
      if(navigation && navigation.extras?.state) {
        this.companyObject = navigation.extras?.state as CompanyModel;
      }
     }

  public ngOnInit(): void {

  }
  

}
