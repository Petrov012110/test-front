import { IResourseResponse } from "./resourse-company.response-model.interface";

export class CompanyModel {

    public logo!: string;
    public businessName!: string;
    public industry!: string;
    public type!: string;

    constructor(data: IResourseResponse) {

        if (data) {
            this.logo = data.logo;
            this.businessName = data.business_name;
            this.industry = data.industry;
            this.type = data.type;
        }

    }
}