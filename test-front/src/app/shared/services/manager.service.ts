import { Injectable } from "@angular/core";
import { ReplaySubject, Subject } from "rxjs";



@Injectable()
export class ManagerService {

    public onTypesEvent$: ReplaySubject<string[]> = new ReplaySubject<string[]>();
    public onIndustriesEvent$: ReplaySubject<string[]> = new ReplaySubject<string[]>();
    public onInputValueEvent$: Subject<string> = new Subject<string>();
    public onCompanySortEvent$: Subject<string> = new Subject<string>();
    public onCompanyFilterIndustryEvent$: Subject<string> = new Subject<string>();
    public onCompanyFilterTypeEvent$: Subject<string> = new Subject<string>();

}