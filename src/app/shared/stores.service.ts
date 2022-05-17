import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  storesForm:FormGroup=this.fb.group({
    StoreId:["0"],
    StoreDesc:["",Validators.required],
    StoreAddress:["",Validators.required],
    StorePhone:[""],
    StoreTypeId:["",Validators.required],
    TreaterId:[""],
    //ItemTypeId:["",Validators.required],
    IsActive:[true],
 
  })


  getAllProductionStores(){
    return this.http.get(environment.apiUrl+"Stores/ProductionStores"); 
  }
  getAllStores(DocTypeId){
    return this.http.get(environment.apiUrl+"Stores/GetAll?id="+DocTypeId);
  }

  getAllRumblingstores(){
    return this.http.get(environment.apiUrl+"Stores/Rumblingstores")
  }

  getAllStoresMediator(){
    return this.http.get(environment.apiUrl+"Stores/Mediatorstores")
  }

  getAllMissionStores(){
    return this.http.get(environment.apiUrl+"Stores/MissionStores")
  }

getAllReceiverstores(){
    return this.http.get(environment.apiUrl+"Stores/Receiverstores")
}

  getActivateStores(){
    return this.http.get(environment.apiUrl+"Stores/ActiveStores")
  }

  getOneStore(StoreId){
    return this.http.get(environment.apiUrl+"Stores/ById?id="+StoreId)
  }
  

  getStoresByStoreType(StoreTypeId){
    return this.http.get(environment.apiUrl+"Stores/ByStoreType?id="+StoreTypeId)
  }

  getByTreater(TreaterId){
return this.http.get(environment.apiUrl+"stores/GetByTreater?id="+TreaterId);
  }

  postStores(body){
    return this.http.post(environment.apiUrl+"Stores/",body)
  }

  putStores(StoreId,body){
    return this.http.put(environment.apiUrl+"Stores/"+StoreId,body)
  }

  deleteStores(StoreId){
    return this.http.delete(environment.apiUrl+"Stores/"+StoreId);
  }
}
