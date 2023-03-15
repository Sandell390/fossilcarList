import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { CarData } from '../interfaces/car-data';

export class CarDatasource extends DataSource<CarData> {
    private _dataStream = new ReplaySubject<CarData[]>

    constructor(carData: CarData[]){
        super();
        this.setData(carData);
    }

    connect(): Observable<CarData[]> {
        return this._dataStream;
      }
    
    disconnect() {}

    setData(data: CarData[]) {
        this._dataStream.next(data);
      }
}
