import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDatasource } from 'src/app/class/car-datasource';
import { CarData } from 'src/app/interfaces/car-data';
import { CarServiceService } from 'src/app/services/car-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CarViewComponent {

  FormCarData: FormGroup = new FormGroup({
    model: new FormControl('Ford', [Validators.required, Validators.pattern('[a-zA-Z1-9 ]{1,}')]),
    count: new FormControl('0', [Validators.required, Validators.pattern('[0-9]{1,}')]),
    changeQuantityPercent: new FormControl('0', [Validators.required, Validators.pattern('[[0-9]{1,}')]),
  })

  FormEditCarData: FormGroup = new FormGroup({
    model: new FormControl('Ford', [Validators.required, Validators.pattern('[a-zA-Z1-9 ]{1,}')]),
    count: new FormControl('0', [Validators.required, Validators.pattern('[0-9]{1,}')]),
    changeQuantityPercent: new FormControl('0', [Validators.required, Validators.pattern('[0-9]{1,}')]),
  })

  displayedColumns: string[] = ['rank', 'model', 'count', 'changeQuantityPercent'];
  expandedElement: CarData | null | undefined;
  dataSource: CarDatasource;

  constructor(private carservice: CarServiceService){
    this.dataSource = this.carservice.CarSource;
  }

  private isDataFilled(Form: FormGroup): boolean | undefined {
    return Form.get('model')?.valid && Form.get('count')?.valid && Form.get('changeQuantityPercent')?.valid;
  }


  setEditFormData(){
    this.FormEditCarData.get('count')?.setValue(this.expandedElement?.count);
    this.FormEditCarData.get('model')?.setValue(this.expandedElement?.model);
    this.FormEditCarData.get('changeQuantityPercent')?.setValue(this.expandedElement?.changeQuantityPercent);
  }

  addData(){
    if(this.isDataFilled(this.FormCarData)){
      let data = {} as CarData;
      data.rank = this.carservice.getLength() + 1;
      data.count = this.FormCarData.get('count')?.value;
      data.model = this.FormCarData.get('model')?.value;
      data.changeQuantityPercent = this.FormCarData.get('changeQuantityPercent')?.value;
      this.carservice.addData(data);
    }
  }

  replaceData(){
    if(this.isDataFilled(this.FormEditCarData)){
      let data = {} as CarData;
      data.rank = this.expandedElement!.rank;
      data.count = this.FormEditCarData.get('count')?.value;
      data.model = this.FormEditCarData.get('model')?.value;
      data.changeQuantityPercent = this.FormEditCarData.get('changeQuantityPercent')?.value;
      this.carservice.replaceData(data);
    }
  }

  getErrorMessageModel(Form: FormGroup): string | void {
    if (Form.get('model')?.hasError('required')) {
      return 'Model must be entered';
    } else if (Form.get('model')?.hasError('pattern')) {
      return 'Model can only contain letters, numbers and spaces';
    }
  }

  getErrorMessageCount(Form: FormGroup): string | void {
    if (Form.get('count')?.hasError('required')) {
      return 'Count must be entered';
    } else if (Form.get('count')?.hasError('pattern')) {
      return 'Count can only contain numbers';
    }
  }
  getErrorMessageChangeQuantityPercent(Form: FormGroup): string | void {
    if (Form.get('changeQuantityPercent')?.hasError('required')) {
      return 'Change Quantity Percent must be entered';
    } else if (Form.get('changeQuantityPercent')?.hasError('pattern')) {
      return 'Change Quantity Percent can only contain numbers';
    }
  }

  removeData(){
    this.carservice.removeData();
  }

}
