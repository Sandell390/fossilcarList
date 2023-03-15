import { Injectable } from '@angular/core';
import { CarDatasource } from '../class/car-datasource';
import { CarData } from '../interfaces/car-data';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  CarSource: CarDatasource;

  private CarList: CarData[] = [
    {rank: 1, model: "Citroen C3", count: 2268, changeQuantityPercent: -27},
    {rank: 2, model: "Peugeot 208", count: 	2107, changeQuantityPercent: -24},
    {rank: 3, model: "Kia Ceed", count: 	1750, changeQuantityPercent: -1},
    {rank: 4, model: "Ford Kuga", count: 1619, changeQuantityPercent: -53},
    {rank: 5, model: "Toyota Yaris", count: 1515, changeQuantityPercent: -45},
    {rank: 6, model: "VW T Roc", count: 1435, changeQuantityPercent: -7}
  ];

  getLength(): number {
    return this.CarList.length;
  }

  constructor() { 
    this.CarSource = new CarDatasource(this.CarList);
  }

  addData(data: CarData) {
    this.CarList.push(data);
    this.CarSource.setData(this.CarList);
  }

  replaceData(data: CarData){
    this.CarList[this.CarList.findIndex(x => x.rank == data.rank)] = data;
    this.CarSource.setData(this.CarList);
  }

  removeData(){
    this.CarList = this.CarList.slice(0, -1);
    this.CarSource.setData(this.CarList);
  }
}
