import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { CompanyFilterEnum } from '../../enums/filter.enum';
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
    public coords: number[] = [0, 0];

    constructor(private _manager: ManagerService) {
        this.createForm();
    }

    public ngOnInit(): void {
        this.getIndustryList();
        this.getTypeList();
        this.subscriptionInputControl();
        this.subscriptionTypeControl();
        this.subscriptionIndustryControl();
    }

    /**
     * Получение списка сфер деятельностей компаней (industry) для контрола companyIndustryControl
     */
    public getIndustryList(): void {
        this._manager.onIndustriesEvent$
            .subscribe(item => {
                if (item) {
                    this.industryList = item.sort();

                }
            });
    }

    /**
     * Получение списка сфер деятельностей компаней (industry) для контрола companyTypeControl
     */
    public getTypeList(): void {
        this._manager.onTypesEvent$
            .subscribe(item => {
                this.typeList = item.sort();
            });
    }

    /**
     * Подписка на контрол inputControl, передаем данное значение в фильтр и работает с ним в search.pipe
     */
    public subscriptionInputControl(): void {
        this.formCompanyFilter.get(CompanyFilterEnum.inputControl)?.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this._manager.onInputValueEvent$.next(el));
    }

    /**
     * Отследиваем все изменения в контроле
     * Подписка на контрол companyIndustryControl, передаем данное значение в фильтр
     */
    public subscriptionIndustryControl(): void {
        this.formCompanyFilter.get(CompanyFilterEnum.companyIndustryControl)?.valueChanges
            .subscribe(item => {
                this._manager.onCompanyFilterIndustryEvent$.next(item);
            });
    }

    /**
     * Отследиваем все изменения в контроле
     * Подписка на контрол companyIndustryControl, передаем данное значение в фильтр
     */
    public subscriptionTypeControl(): void {
        this.formCompanyFilter.get(CompanyFilterEnum.companyTypeControl)?.valueChanges
            .subscribe(item => {
                this._manager.onCompanyFilterTypeEvent$.next(item);
            });
    }

    private createForm(): void {
        this.formCompanyFilter = new FormGroup({
            inputControl: new FormControl(),
            companyIndustryControl: new FormControl(),
            companyTypeControl: new FormControl(),
        });
    }

}
