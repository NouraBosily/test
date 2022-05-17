import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StoresTypesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  storesTypesForm:FormGroup=this.fb.group({
    StoreTypeId:["0"],
    StoreTypeDesc:["",Validators.required],
    IsActive:[true],
 
  })

  getAllStoresTypes(FlagId){
    return this.http.get(environment.apiUrl+"StoreTypes/GetAll?id="+FlagId);
  }
  getOneStoreType(StoreTypeId){
    return this.http.get(environment.apiUrl+"StoreTypes/GetOne?id="+StoreTypeId);
  }

  postStoreTye(body)
{
return this.http.post(environment.apiUrl+"StoreTypes/",body);
}
putStoreType(StoreTypeId,body){
return this.http.put(environment.apiUrl+"StoreTypes/"+StoreTypeId,body);
}
deleteStoreType(StoreTypeId){
return this.http.delete(environment.apiUrl+"StoreTypes/"+StoreTypeId);
}


}
