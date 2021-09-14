import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '../shared/models/company.model';
import { FilterService } from '../shared/services/filter.service';
import { ManagerService } from '../shared/services/maneger.service';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./styles/company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    public companyList: CompanyModel[] = [];

    constructor(
        private resourseCompany: ResourseCompanyService,
        private maneger: ManagerService,
        private filter: FilterService,
    ) { }

    public ngOnInit(): void {
        this.resourseCompany.getData()
            .subscribe(item => {
                this.companyList = item;
                this.maneger.onTypesEvent.next(this.filter.getTypes(item));
                this.maneger.onIndustriesEvent.next(this.filter.getIndustries(item));
            });
    }



}
