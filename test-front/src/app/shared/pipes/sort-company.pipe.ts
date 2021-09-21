import { Pipe, PipeTransform } from "@angular/core";

import { CompanySortEnum } from "../enums/sort.enum";
import { CompanyModel } from "../models/company.model";

@Pipe({
    name: 'sortCompany'
})
export class SortCompanyNamePipe implements PipeTransform {

    public transform(company: CompanyModel[], search = ''): CompanyModel[] {

        if (!search.trim()) {
            return company;
        }

        return company.sort((a, b): any => {
            switch (search) {
                case CompanySortEnum.nameControl:
                    return this.comparison(a.businessName, b.businessName);
                case CompanySortEnum.industryControl:
                    return this.comparison(a.industry, b.industry);
                case CompanySortEnum.typeControl:
                    return this.comparison(a.type, b.type);
                default:
                    return company;
            }
        });

    }

    public comparison(nameA: string, nameB: string): number {
        if (nameA.toLowerCase() < nameB.toLowerCase()) {
            return -1;
        } else if (nameA.toLowerCase() > nameB.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }
}