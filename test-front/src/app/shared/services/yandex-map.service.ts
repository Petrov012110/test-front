import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

declare var ymaps: any;

@Injectable({
    providedIn: 'root'
})
export class YandexMapService {

    map$: Subject<any>;

    constructor() {
        this.map$ = new Subject<any>();
    }

    getMap(element: string, coords: number[]): Observable<any> {
        const scriptYmaps = document.createElement('script');
        scriptYmaps.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=5516c063-c868-4d35-a6b7-c7394974ba2a';
        document.body.appendChild(scriptYmaps);
        const data = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "id": 0, "geometry": { "type": "Point", "coordinates": [55.831903, 37.411961] }, "properties": { "balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>" } },
                { "type": "Feature", "id": 1, "geometry": { "type": "Point", "coordinates": [55.763338, 37.565466] }, "properties": { "balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>" } },
                { "type": "Feature", "id": 2, "geometry": { "type": "Point", "coordinates": [55.763338, 37.565466] }, "properties": { "balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>" } }
            ]
        }
        const createMap = () => {
            const map = new ymaps.Map(
                element,
                {
                    center: coords,
                    zoom: 9
                }
            )
            const objectManager = new ymaps.ObjectManager({
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: true,
                // ObjectManager принимает те же опции, что и кластеризатор.
                gridSize: 32,
                clusterDisableClickZoom: true
            });

            objectManager.objects.options.set('preset', 'islands#greenDotIcon');
            objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
            map.geoObjects.add(objectManager.add(data));
            map.geoObjects
                .add(new ymaps.Placemark(coords, {
                    balloonContent: 'цвет <strong>носика Гены</strong>',
                    iconCaption: 'Название'
                }, {
                    preset: 'islands#greenDotIconWithCaption'
                }))

        }
        scriptYmaps.onload = function () {
            ymaps.ready(createMap);
        }

        return this.map$;
    }
}