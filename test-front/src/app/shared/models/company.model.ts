import { IResourseResponse } from "./resourse-company.response-model.interface";

export class CompanyModel {

    public logo!: string;
    public businessName!: string;
    public industry!: string;
    public type!: string;
    public id!: number;
    public full_address!: string;
    public latitude!: number;
    public longitude!: number;

    constructor(data: IResourseResponse) {

        if (data) {
            this.logo = data.logo;
            this.businessName = data.business_name;
            this.industry = data.industry;
            this.type = data.type;
            this.id = data.id;
            this.full_address = data.full_address;
            this.latitude = data.latitude;
            this.longitude = data.longitude;
        }

    }
}