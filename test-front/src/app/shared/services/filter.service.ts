import { Injectable } from "@angular/core";
import { CompanyModel } from "../models/company.model";

@Injectable()
export class FilterService {

    /**
     * @param data - массив моделей компаний
     * @returns - массив уникальных типов компаний
     */

    public getTypes(data: CompanyModel[]): string[] {
        const typeArr = data.map(item => item.type);
        const uniqTypeArr = this.unique(typeArr);

        return uniqTypeArr;
    }

    /**
     * @param data - массив моделей компаний
     * @returns - массив уникальных сфер деятельностей компаний
     */

    public getIndustries(data: CompanyModel[]): string[] {
        const industryArr = data.map(item => item.industry);
        const uniqIndustryArr = this.unique(industryArr);

        return uniqIndustryArr;
    }

    public unique(arr: string[]): string[] {

        const result: string[] = [];

        for (const str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }

        return result;
    }

}