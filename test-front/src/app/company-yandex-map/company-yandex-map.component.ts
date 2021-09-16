import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPoints, Points } from '../shared/models/points.model';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { YandexMapService } from '../shared/services/yandex-map.service';

@Component({
    selector: 'app-company-yandex-map',
    templateUrl: './company-yandex-map.component.html',
    styleUrls: ['./styles/company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit, OnDestroy {
    public map: any;

    public arrCompany: IPoints[] = []

    public ngUnsubscribe$: Subject<void>;

    constructor(
        private _mapLoaderService: YandexMapService,
        private storage: LocalStorageService
    ) {

        this.ngUnsubscribe$ = new Subject<void>();

        this.storage.getCompanyFromLocalStorage().subscribe(data => {
            data.forEach(element => {
                this.arrCompany.push(new Points(element));
            });

        });
    }

    public ngOnInit(): void {

        this._mapLoaderService.getMap(this.arrCompany)
            .pipe(
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe(map => {
                this.map = map;
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

}
