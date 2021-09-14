import { Pipe, PipeTransform } from "@angular/core";
import { CompanyModel } from "../models/company.model";

@Pipe({
    name: 'searchCompany'
})
export class SearchPipe implements PipeTransform{
    transform(company: CompanyModel[], search = ''): CompanyModel[] {
        if(!search.trim()) {
            return company;
        }

        return company.filter(item => {
            return item.businessName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
    }
}