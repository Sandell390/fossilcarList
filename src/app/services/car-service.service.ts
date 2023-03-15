import { Injectable } from '@angular/core';
import { CarDatasource } from '../class/car-datasource';
import { CarData } from '../interfaces/car-data';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  CarSource: CarDatasource;

  CarList: CarData[] = [
    {rank: 1, model: "Kage", count: 12, changeQuantityPercent: 100},
    {rank: 2, model: "Cookie", count: 1, changeQuantityPercent: 2},
    {rank: 3, model: "Muffin", count: 412, changeQuantityPercent: 140},
    {rank: 4, model: "vingummi", count: 634, changeQuantityPercent: 785},
    {rank: 5, model: "chokolade", count: 2, changeQuantityPercent: 38},
    {rank: 6, model: "is", count: 186, changeQuantityPercent: 4}
  ];

  constructor() { 
    this.CarSource = new CarDatasource(this.CarList);
  }

  removeData(){
    this.CarList = this.CarList.slice(0, -1);
    this.CarSource.setData(this.CarList);
  }
}
