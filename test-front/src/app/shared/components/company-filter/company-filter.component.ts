import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ManagerService as ManagerService } from '../../services/maneger.service';

@Component({
    selector: 'app-company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./styles/company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {

    public formCompany!: FormGroup;
    public industryList!: string[];


    constructor(private manager: ManagerService) {
        this.createForm();
    }

    ngOnInit(): void {
        this.manager.onIndustriesEvent
            .subscribe(item => {
                this.industryList = item;
            });

        this.formCompany.get(['inputControl'])?.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this.manager.onInputValueEvent.next(el));
    }

    private createForm(): void {
        this.formCompany = new FormGroup({
            inputControl: new FormControl(),
            companyNameControl: new FormControl(),

        });

    }

}
