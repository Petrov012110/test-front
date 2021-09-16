import { CompanyModel } from "./company.model";

export interface IPoints {
    coords: number[], 
    text: string
}

export class Points implements IPoints {
    public coords: number[] = [];
    public text!: string;

    constructor(data: CompanyModel) {
        if(data) {
            this.coords[0] = (data.longitude);
            this.coords[1] = (data.latitude);
            this.text = data.businessName;

        }
        
    }
}