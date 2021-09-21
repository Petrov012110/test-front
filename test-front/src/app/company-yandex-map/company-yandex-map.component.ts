import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Points } from '../shared/models/points.model';
import { IPoints } from '../shared/models/points.model.interface';
import { CacheService } from '../shared/services/cache.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ManagerService } from '../shared/services/manager.service';
import { YandexMapService } from '../shared/services/yandex-map.service';

@Component({
    selector: 'app-company-yandex-map',
    templateUrl: './company-yandex-map.component.html',
    styleUrls: ['./styles/company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit, OnDestroy {

    public arrCompany: IPoints[] = [];
    private _unsubscriber$: Subject<void> = new Subject<void>();

    constructor(
        private _mapLoaderService: YandexMapService,
        private _storage: LocalStorageService,
        private _cache: CacheService,
    ) {
        this.getCompanyCache();
    }

    public ngOnInit(): void {
        this._mapLoaderService.getMap(this.arrCompany);
    }

    public ngOnDestroy(): void {
        this._unsubscriber$.next();
        this._unsubscriber$.complete();
    }

    /**
     * Реализация через LocalStorage
     */
    public getCompanyLocalStorage(): void {
        this._storage.getCompanyFromLocalStorage()
            .pipe(
                takeUntil(this._unsubscriber$)
            ).subscribe(data => {
                data.forEach(element => {
                    this.arrCompany.push(new Points(element));
                });
            });
    }

    /**
     * Реализация через кэш
     */
    public getCompanyCache(): void {
        this._cache.getData()
            .pipe(
                takeUntil(this._unsubscriber$)
            ).subscribe(item => {
                item.forEach(element => this.arrCompany.push(new Points(element)));
            });
    }



}
