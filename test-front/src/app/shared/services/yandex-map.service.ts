import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IPoints } from "../models/points.model";


declare var ymaps: any;

@Injectable({
    providedIn: 'root'
})
export class YandexMapService {

    map$: Subject<any>;

    constructor() {
        this.map$ = new Subject<any>();
    }

    getMap(myPoints: IPoints[]): Observable<any> {
        const scriptYmaps = document.createElement('script');
        scriptYmaps.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=5516c063-c868-4d35-a6b7-c7394974ba2a';
        document.body.appendChild(scriptYmaps);

        const createMap = () => {
            let myMap = new ymaps.Map('map', {
                center: [0, 0],
                zoom: 2,
                controls: ['zoomControl']
            }),
        // Создаем коллекцию.
            myCollection = new ymaps.GeoObjectCollection();
    
        // Заполняем коллекцию данными.
        for (let i = 0, l = myPoints.length; i < l; i++) {
            let point = myPoints[i];
            myCollection.add(new ymaps.Placemark(
                point.coords, {
                    balloonContentBody: point.text
                }
            ));
        }
    
        // Добавляем коллекцию меток на карту.
        myMap.geoObjects.add(myCollection);


        }
        scriptYmaps.onload = function () {
            ymaps.ready(createMap);
        }

        return this.map$;
    }
}