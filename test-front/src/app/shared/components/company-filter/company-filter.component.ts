import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CompanyFilterEnum } from 'src/environments/enums';
import { ManagerService as ManagerService } from '../../services/maneger.service';

@Component({
    selector: 'app-company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./styles/company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {

    public formCompanyFilter!: FormGroup;
    public industryList!: string[];
    public typeList!: string[];
    public industryValue!: string;

    constructor(private manager: ManagerService) {
        this.createForm();
    }

    public ngOnInit(): void {
        this.getIndustryList();
        this.getTypeList();
        this.subscriptionInputControl();

        this.formCompanyFilter.get(CompanyFilterEnum.companyIndustryControl)?.valueChanges
            .subscribe(item => {
                this.manager.onCompanyFilterIndustryEvent.next(item);
            });
        this.formCompanyFilter.get(CompanyFilterEnum.companyTypeControl)?.valueChanges
            .subscribe(item => {
                this.manager.onCompanyFilterTypeEvent.next(item);
            });
    }

    public getIndustryList(): void {
        this.manager.onIndustriesEvent
            .subscribe(item => {
                this.industryList = item.sort();
            });
    }

    public getTypeList(): void {
        this.manager.onTypesEvent
            .subscribe(item => {
                this.typeList = item.sort();
            });
    }

    public subscriptionInputControl(): void {
        this.formCompanyFilter.get(CompanyFilterEnum.inputControl)?.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this.manager.onInputValueEvent.next(el));
    }

    private createForm(): void {
        this.formCompanyFilter = new FormGroup({
            inputControl: new FormControl(),
            companyIndustryControl: new FormControl(),
            companyTypeControl: new FormControl(),
        });
    }

}
