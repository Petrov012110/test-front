import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '../shared/models/company.model';
import { FilterService } from '../shared/services/filter.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ManagerService } from '../shared/services/maneger.service';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./styles/company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    public companyList: CompanyModel[] = [];
    public searchStr = '';
    public searchCompany = '';
    public searchCompanyIndustry = '';
    public searchCompanyType = '';

    constructor(
        private resourseCompany: ResourseCompanyService,
        private manager: ManagerService,
        private filter: FilterService,
        private storage: LocalStorageService
    ) { }

    public ngOnInit(): void {
        this.getDataCompany();
        this.getSearchStr();
        this.getCompanySortValue();
        this.getCompanyIndustryValue();
        this.getCompanyTypeValue();
    }

    public getDataCompany(): void {
        this.resourseCompany.getData()
            .subscribe(item => {
                this.companyList = item;
                this.manager.onTypesEvent.next(this.filter.getTypes(item));
                this.manager.onIndustriesEvent.next(this.filter.getIndustries(item));
                this.storage.setCompanyToLocalStorage(item);
            });
    }

    public getSearchStr(): void {
        this.manager.onInputValueEvent
            .subscribe(value => this.searchStr = value);
    }

    public getCompanySortValue(): void {
        this.manager.onCompanySortEvent
            .subscribe(value => {
                this.searchCompany = value;
            });
    }

    public getCompanyIndustryValue(): void {
        this.manager.onCompanyFilterIndustryEvent
            .subscribe(value => {
                this.searchCompanyIndustry = value;
            });
    }

    public getCompanyTypeValue(): void {
        this.manager.onCompanyFilterTypeEvent
            .subscribe(value => {
                this.searchCompanyType = value;
            });
    }

}
