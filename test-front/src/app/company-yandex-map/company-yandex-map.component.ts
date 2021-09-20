import { Component, OnInit } from '@angular/core';

import { IPoints, Points } from '../shared/models/points.model';
import { CacheService } from '../shared/services/cache.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ManagerService } from '../shared/services/maneger.service';
import { YandexMapService } from '../shared/services/yandex-map.service';

@Component({
    selector: 'app-company-yandex-map',
    templateUrl: './company-yandex-map.component.html',
    styleUrls: ['./styles/company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit {

    public arrCompany: IPoints[] = [];

    constructor(
        private _mapLoaderService: YandexMapService,
        private _storage: LocalStorageService,
        private _cache: CacheService,
        private _manager: ManagerService,
    ) {
        this.getCompanyLocalStorage();
    }

    public ngOnInit(): void {
        this._mapLoaderService.getMap(this.arrCompany);
    }

    /**
     * Реализация через LocalStorage
     */
    public getCompanyLocalStorage(): void {
        this._storage.getCompanyFromLocalStorage().subscribe(data => {
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
            .subscribe(item => {
                item.forEach(element => this.arrCompany.push(new Points(element)));
            });
    }

    public getValue(e: IPoints): void {
        this._manager.onCoordsEvent$.next(e);
    }


}
