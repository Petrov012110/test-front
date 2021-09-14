import { Component, Input, OnInit } from '@angular/core';
import { CompanyModel } from '../../models/company.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./styles/company-item.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  public companyData!: CompanyModel;

  constructor() { }

  public ngOnInit(): void {
  }

}
