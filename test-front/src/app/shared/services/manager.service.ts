import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable()
export class ManagerService {

    public onTypesEvent$: Subject<string[]> = new Subject<string[]>();
    public onIndustriesEvent$: Subject<string[]> = new Subject<string[]>();
    public onInputValueEvent$: Subject<string> = new Subject<string>();
    public onCompanySortEvent$: Subject<string> = new Subject<string>();
    public onCompanyFilterIndustryEvent$: Subject<string> = new Subject<string>();
    public onCompanyFilterTypeEvent$: Subject<string> = new Subject<string>();

}