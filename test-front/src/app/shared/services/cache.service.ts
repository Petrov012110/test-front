import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { map, publishReplay, refCount, takeUntil } from "rxjs/operators";

import { CompanyModel } from "../models/company.model";
import { IResourseResponse } from "../models/resourse-company.response-model.interface";

@Injectable()
export class CacheService  {

    private _instanceCache$ = new Map<string, Observable<CompanyModel[]>>();

    constructor(private _http: HttpClient) {

    }

    /**
     * Запрос с кэшированием
     * @param size - количество компаний, которое необходимо получить, также служит ключем в КЭШе
     * @returns - массив моделей компаний
     */
    public getData(size: number = 20): Observable<CompanyModel[]> {
        const key = JSON.stringify(size);
        if (!this._instanceCache$.has(key)) {
            const response = this._http.get<IResourseResponse[]>(`https://random-data-api.com/api/company/random_company?size=${size}`)
                .pipe(
                    map((answer: IResourseResponse[]) => {
                        const modelresponse = answer.map(item => new CompanyModel(item));
                        return modelresponse;
                    }),
                    publishReplay(1),
                    refCount()
                );

            this._instanceCache$.set(key, response);
        }
        return this._instanceCache$.get(key) as Observable<CompanyModel[]>;

    }
}