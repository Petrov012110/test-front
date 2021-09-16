import { IPoints } from "./points.model";

export class CustomSearchProvider {
    public points: IPoints[] = []

    constructor(data: IPoints[]) {
        if (data) {
            this.points = data;
        }
    }
}