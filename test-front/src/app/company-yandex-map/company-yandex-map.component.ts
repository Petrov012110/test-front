import { Component, OnInit } from '@angular/core';
import { IPoints, Points } from '../shared/models/points.model';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ResourseCompanyService } from '../shared/services/resourse-company.service';
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
        private storage: LocalStorageService,
        private _resourseCompany: ResourseCompanyService
    ) {
        this.getDataCompany();
        //getCompany(): 
    }

    public ngOnInit(): void {
        this._mapLoaderService.getMap(this.arrCompany);
    }

    /**
     * Реализация через LocalStorage
     */
    public getCompany(): void {
        this.storage.getCompanyFromLocalStorage().subscribe(data => {
            data.forEach(element => {
                this.arrCompany.push(new Points(element));
            });
        });
    }

    /**
     * Реализация через кэш
     */
    public getDataCompany(): void {
        this._resourseCompany.getData()
            .subscribe(item => {
                item.forEach(element => this.arrCompany.push(new Points(element)));
            });
    }

}
