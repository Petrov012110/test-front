import { Pipe, PipeTransform } from "@angular/core";
import { CompanyModel } from "../models/company.model";

@Pipe({
    name: 'sortType'
})
export class SortTypePipe implements PipeTransform{
    public transform(company: CompanyModel[], search = ''): CompanyModel[] {
        console.log("TYPE", search);
        
        if (!search.trim()) {
            return company;
        }

        return company.filter(item => item.type === search);

    }
}