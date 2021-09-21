import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject } from "rxjs";
import { map, takeUntil } from 'rxjs/operators';

import { IResourseResponse } from "../models/resourse-company.response-model.interface";
import { CompanyModel } from "../models/company.model";

@Injectable()
export class ResourseCompanyService implements OnDestroy {

    private _unsubscriber$: Subject<void> = new Subject<void>();

    constructor(private _http: HttpClient) {

    }

    public ngOnDestroy(): void {
        this._unsubscriber$.next();
        this._unsubscriber$.complete();
    }

    /**
     * Запрос на сервер
     */

    public getData(): Observable<CompanyModel[]> {
        return this._http.get<IResourseResponse[]>(`https://random-data-api.com/api/company/random_company?size=80`)
            .pipe(
                map((response: IResourseResponse[]) => {
                    const modelresponse = response.map(item => new CompanyModel(item));
                    return modelresponse;
                })
            )
    }

}