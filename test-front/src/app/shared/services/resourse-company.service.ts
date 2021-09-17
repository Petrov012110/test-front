import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, publishReplay, refCount, takeUntil } from 'rxjs/operators';
import { IResourseResponse } from "../models/resourse-company.response-model.interface";
import { CompanyModel } from "../models/company.model";

@Injectable()
export class ResourseCompanyService implements OnDestroy {

    private _unsubscriber: Subject<void> = new Subject<void>();
    private _instanceCache = new Map<string, Observable<CompanyModel[]>>();

    constructor(private http: HttpClient) {

    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    public getData(size: number = 20): Observable<CompanyModel[]> {
        const key = JSON.stringify(size);
        if (!this._instanceCache.has(key)) {
            const response = this.http.get<IResourseResponse[]>(`https://random-data-api.com/api/company/random_company?size=${size}`)
                .pipe(
                    map((response: IResourseResponse[]) => {
                        const modelresponse = response.map(item => new CompanyModel(item));
                        return modelresponse;
                    }),
                    publishReplay(1),
                    refCount(),
                    takeUntil(this._unsubscriber)
                )
                this._instanceCache.set(key, response);
        }
        return this._instanceCache.get(key) as Observable<CompanyModel[]>;

    }

    // public getData(): Observable<CompanyModel[]> {
    //     return this.http.get<IResourseResponse[]>(`https://random-data-api.com/api/company/random_company?size=30`)
    //         .pipe(
    //             map((response: IResourseResponse[]) => {
    //                 const modelresponse = response.map(item => new CompanyModel(item));
    //                 return modelresponse;
    //             }),
    //             takeUntil(this._unsubscriber)
    //         )
    // }

}