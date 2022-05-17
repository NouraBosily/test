import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InitialValueItemService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  initialValueItemForm:FormGroup=this.fb.group({
    InitailVaueItemId:["0",Validators.required],
    ItemTypeId:["",Validators.required],
    TreaterId:[""],
    StoreId:["",Validators.required],
    GroupId:["",Validators.required],
    ItemId:["",Validators.required],
    ItemsStandardId:[""],
    PatchNumber:[""],
    Quantity:["",[Validators.required,Validators.min(0)]],
    QuantityKilo:["",Validators.min(0)]
  })

  getAllInitial(){
    return this.http.get(environment.apiUrl+"InitialValueItems")
  }

  postInitial(body){
    return this.http.post(environment.apiUrl+"InitialValueItems",body);
  }
}
