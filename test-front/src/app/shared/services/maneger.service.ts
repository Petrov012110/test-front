import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ManagerService {

    public onTypesEvent: Subject<string[]> = new Subject<string[]>();
    public onIndustriesEvent: Subject<string[]> = new Subject<string[]>();

}