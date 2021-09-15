import { Pipe, PipeTransform } from "@angular/core";
import { CompanyModel } from "../models/company.model";

@Pipe({
    name: 'sortIndustry'
})
export class SortIndustryPipe implements PipeTransform{
    public transform(company: CompanyModel[], search = ''): CompanyModel[] {

        if (!search.trim()) {
            return company;
        }

        return company.filter(item => item.industry === search);

    }
}