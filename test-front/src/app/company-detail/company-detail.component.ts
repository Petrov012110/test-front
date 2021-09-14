import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./styles/company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private resourseCompany: ResourseCompanyService,
    ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      
    })
  }
  

}
