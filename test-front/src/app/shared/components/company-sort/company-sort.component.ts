import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanySortEnum } from 'src/environments/enums';

@Component({
    selector: 'app-company-sort',
    templateUrl: './company-sort.component.html',
    styleUrls: ['./styles/company-sort.component.scss']
})
export class CompanySortComponent implements OnInit {

    public form!: FormGroup;

    constructor() {
        this.createForm();
    }

    public ngOnInit(): void {
        this.subscribtionControls();
    }

    private createForm(): void {
        this.form = new FormGroup({
            nameControl: new FormControl(),
            typeControl: new FormControl(),
            industryControl: new FormControl(),
        });

    }

    public subscribtionControls(): void {

        this.form.get(CompanySortEnum.nameControl)?.valueChanges.subscribe(selectItem => {
            if (selectItem) {
                this.form.get(CompanySortEnum.typeControl)?.setValue(false);
                this.form.get(CompanySortEnum.industryControl)?.setValue(false);
            }
        });

        this.form.get(CompanySortEnum.typeControl)?.valueChanges.subscribe(selectItem => {
            if (selectItem) {
                this.form.get(CompanySortEnum.nameControl)?.setValue(false);
                this.form.get(CompanySortEnum.industryControl)?.setValue(false);
            }
        });

        this.form.get(CompanySortEnum.industryControl)?.valueChanges.subscribe(selectItem => {
            if (selectItem) {
                this.form.get(CompanySortEnum.nameControl)?.setValue(false);
                this.form.get(CompanySortEnum.typeControl)?.setValue(false);
            }
        });
    }

}
