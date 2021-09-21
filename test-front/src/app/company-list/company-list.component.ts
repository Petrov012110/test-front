import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanyModel } from '../shared/models/company.model';
import { CacheService } from '../shared/services/cache.service';
import { FilterService } from '../shared/services/filter.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ManagerService } from '../shared/services/manager.service';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./styles/company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {

    public companyList: CompanyModel[] = [];
    public searchStr = '';
    public searchCompany = '';
    public searchCompanyIndustry = '';
    public searchCompanyType = '';
    private _unsubscriber$: Subject<void> = new Subject<void>();


    constructor(
        private _resourse: ResourseCompanyService,
        private _manager: ManagerService,
        private _filter: FilterService,
        private _storage: LocalStorageService,
        private _cache: CacheService,
    ) { }

    public ngOnInit(): void {
        this.getDataCompanyCache();
        this.getSearchStr();
        this.getCompanySortValue();
        this.getCompanyIndustryValue();
        this.getCompanyTypeValue();
    }

    public ngOnDestroy(): void {
        this._unsubscriber$.next();
        this._unsubscriber$.complete();
    }

    /**
     * 1) Стандартный запрос, без сохранения в КЭШ
     * 2) Подписки на список типов и сфер деятельности компаний для фильта
     * 3) Сохранение ответа с сервера в LocalStorage
     */
    public getDataCompanyLocalStorage(): void {
        this._resourse.getData()
            .pipe(
                takeUntil(this._unsubscriber$)
            )
            .subscribe(item => {
                this.companyList = item;
                this._manager.onTypesEvent$.next(this._filter.getTypes(item));
                this._manager.onIndustriesEvent$.next(this._filter.getIndustries(item));
                this._storage.setCompanyToLocalStorage(item);
            });
    }

    /**
     * 1) Запрос ссохранением в КЭШ
     * 2) Подписки на список типов и сфер деятельности компаний для фильта
     */
    public getDataCompanyCache(): void {
        this._cache.getData()
            .pipe(
                takeUntil(this._unsubscriber$)
            )
            .subscribe(item => {
                this.companyList = item;
                this._manager.onTypesEvent$.next(this._filter.getTypes(item));
                this._manager.onIndustriesEvent$.next(this._filter.getIndustries(item));
            });
    }

    /**
     * Метод для получения строки, необходиомй для поиска по названиям компании 
     */
    public getSearchStr(): void {
        this._manager.onInputValueEvent$
            .pipe(
                takeUntil(this._unsubscriber$)
            )
            .subscribe(value => this.searchStr = value);
    }

    /**
     * Метод, котрый получает знчения чекбоксов: Название, Тип, Вид деятельности
     * по полученным значения сортируем наш список компаний
     */
    public getCompanySortValue(): void {
        this._manager.onCompanySortEvent$
            .pipe(
                takeUntil(this._unsubscriber$)
            ).subscribe(value => {
                this.searchCompany = value;
            });
    }

    /**
     * Метод, подписывающийся на значения видов деятельностей компаний (industry)
     * данные мы получаем из ответа с сервера
     */
    public getCompanyIndustryValue(): void {
        this._manager.onCompanyFilterIndustryEvent$
            .pipe(
                takeUntil(this._unsubscriber$)
            ).subscribe(value => {
                this.searchCompanyIndustry = value;
            });
    }

    /**
     * Метод, подписывающийся на значения типов компаний (type)
     * данные мы получаем из ответа с сервера
     */
    public getCompanyTypeValue(): void {
        this._manager.onCompanyFilterTypeEvent$
            .pipe(
                takeUntil(this._unsubscriber$)
            ).subscribe(value => {
                this.searchCompanyType = value;
            });
    }

}
