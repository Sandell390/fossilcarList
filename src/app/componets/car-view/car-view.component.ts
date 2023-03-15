import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDatasource } from 'src/app/class/car-datasource';
import { CarData } from 'src/app/interfaces/car-data';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent {

  displayedColumns: string[] = ['rank', 'model', 'count', 'changeQuantityPercent'];
  dataSource: CarDatasource;

  constructor(private carservice: CarServiceService){
    this.dataSource = this.carservice.CarSource;
  }

}
