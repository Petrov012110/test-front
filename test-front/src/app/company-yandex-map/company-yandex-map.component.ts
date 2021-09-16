import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YandexMapService } from '../shared/services/yandex-map.service';

@Component({
    selector: 'app-company-yandex-map',
    templateUrl: './company-yandex-map.component.html',
    styleUrls: ['./styles/company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit, OnDestroy {
    public map: any;

    public ngUnsubscribe$: Subject<void>;

    constructor(private _mapLoaderService: YandexMapService) {

        this.ngUnsubscribe$ = new Subject<void>();
    }

    public ngOnInit(): void {

        this._mapLoaderService.getMap(
            'map',
            [55.76, 37.64]
        )
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
