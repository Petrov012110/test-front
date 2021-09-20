import { Component, Input } from '@angular/core';
import { CompanyModel } from '../../models/company.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./styles/company-item.component.scss']
})
export class CompanyComponent {

  @Input()
  public companyData!: CompanyModel;


}
