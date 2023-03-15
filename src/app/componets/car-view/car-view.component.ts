import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDatasource } from 'src/app/class/car-datasource';
import { CarData } from 'src/app/interfaces/car-data';
import { CarServiceService } from 'src/app/services/car-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent {

  FormCarData: FormGroup = new FormGroup({
    model: new FormControl('Ford', [Validators.required, Validators.pattern('[a-zA-Z1-9 ]{1,}')]),
    count: new FormControl('0', [Validators.required, Validators.pattern('[0-9]{1,}')]),
    changeQuantityPercent: new FormControl('0', [Validators.required, Validators.pattern('[0-9]{1,}')]),
  })

  displayedColumns: string[] = ['rank', 'model', 'count', 'changeQuantityPercent'];
  dataSource: CarDatasource;

  constructor(private carservice: CarServiceService){
    this.dataSource = this.carservice.CarSource;
  }

  private isDataFilled(): boolean | undefined {
    return this.FormCarData.get('model')?.valid && this.FormCarData.get('count')?.valid && this.FormCarData.get('changeQuantityPercent')?.valid;
  }


  addData(){
    if(this.isDataFilled()){
      let data = {} as CarData;
      data.rank = this.carservice.getLength();
      data.count = this.FormCarData.get('count')?.value;
      data.model = this.FormCarData.get('model')?.value;
      data.changeQuantityPercent = this.FormCarData.get('changeQuantityPercent')?.value;
      this.carservice.addData(data);
    }
  }

  getErrorMessageModel(): string{
    return "";
  }

  getErrorMessageCount(): string{
    return "";
  }

  getErrorMessageChangeQuantityPercent(): string{
    return "";
  }

  removeData(){
    this.carservice.removeData();
  }

}
