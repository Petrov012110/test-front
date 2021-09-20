import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CompanyModel } from "../models/company.model";

@Injectable()
export class LocalStorageService {
    
    /**
     * Работа с LocalStorage, сохранем и возвращаем данные из LS
     */

    public setCompanyToLocalStorage(company: CompanyModel[]): void {
        localStorage.setItem('companyHistory', JSON.stringify(company));
    }

    public getCompanyFromLocalStorage(): Observable<CompanyModel[]> {
        return of(JSON.parse(localStorage.getItem('companyHistory') || '[]'));
    }


}