import { Pipe, PipeTransform } from "@angular/core";
import { CompanySortEnum } from "src/environments/enums";
import { CompanyModel } from "../models/company.model";

@Pipe({
    name: 'sortCompany'
})
export class SortCompanyNamePipe implements PipeTransform {
    public transform(company: CompanyModel[], search = ''): CompanyModel[] {

        if (!search.trim()) {
            return company;
        }

        return company.sort(function (a, b): any {
            if (search === CompanySortEnum.nameControl) {
                const nameA = a.businessName.toLowerCase();
                const nameB = b.businessName.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else if (search === CompanySortEnum.industryControl) {
                const nameA = a.industry.toLowerCase();
                const nameB = b.industry.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else if (search === CompanySortEnum.typeControl) {
                const nameA = a.type.toLowerCase();
                const nameB = b.type.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                return company;
            }

        });
    }


}