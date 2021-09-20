import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyModel } from '../shared/models/company.model';

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./styles/company-detail.component.scss']
})
export class CompanyDetailComponent {

    public companyObject!: CompanyModel;

    constructor(private _route: Router) {
        /**
         * Получаю  объект в данный компонент через роут
         */
        const navigation = this._route.getCurrentNavigation();

        if (navigation && navigation.extras?.state) {
            this.companyObject = navigation.extras?.state as CompanyModel;
        }

    }

}
