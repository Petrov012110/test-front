import { Injectable } from "@angular/core";
import { CompanyModel } from "../models/company.model";

@Injectable()
export class FilterService {

    constructor() {

    }

    public getTypes(data: CompanyModel[]): string[] {
        return data.map(item => item.type);
    }

    public getIndustries(data: CompanyModel[]): string[] {
        return data.map(item => item.industry);
    }

}