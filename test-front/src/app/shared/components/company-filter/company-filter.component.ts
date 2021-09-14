import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerService as ManagerService } from '../../services/maneger.service';

@Component({
    selector: 'app-company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./styles/company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {

    public formIndustry!: FormGroup;
    public formTypes!: FormGroup;
    public industryList!: string[];

    constructor(private manager: ManagerService) {
        this.createForm();
    }

    ngOnInit(): void {
        this.manager.onIndustriesEvent
            .subscribe(item => {
                this.industryList = item;
            });
    }

    private createForm(): void {
        this.formIndustry = new FormGroup({
            childControl: new FormControl()
            // fundRaisingControl: new FormControl(),
            // computerHardwareControl: new FormControl(),
            // commercialRealEstateControl: new FormControl(),
            // publicSafetyControl: new FormControl(),
            // governmentRelationsControl: new FormControl(),
            // renewablesEnvironmentControl: new FormControl(),
            // farmingControl: new FormControl(),
            // designControl: new FormControl(),
            // newspapersControl: new FormControl(),
            // motionPicturesAndFilmControl: new FormControl(),
            // packageFreightDeliveryControl: new FormControl(),
            // telecommunicationsControl: new FormControl(),
            // lawPracticeControl: new FormControl(),
            // hospitalityControl: new FormControl(),
            // investmentManagementControl: new FormControl(),
            // photographyControl: new FormControl(),
            // writingAndEditingControl: new FormControl(),
            // railroadManufactureControl: new FormControl(),
            // logisticsAndSupplyChainControl: new FormControl(),
            // paperForestProductsControl: new FormControl(),
            // importAndExportControl: new FormControl(),
            // biotechnologyControl: new FormControl(),
            // publicRelationsAndCommunicationsControl: new FormControl(),
            // gamblingCasinosControl: new FormControl(),
            // primarySecondaryEducationControl: new FormControl(),
            // wirelessControl: new FormControl(),
            // chemicalsControl: new FormControl(),
            // informationTechnologyAndServicesControl: new FormControl(),

        });

    }

}
