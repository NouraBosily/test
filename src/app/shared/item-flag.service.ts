import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemFlagService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

itemFlagForm:FormGroup=this.fb.group({
  ItemFlagId:["0"],
  ItemFlagDesc:["",Validators.required],
  ItemTypeId:["",Validators.required],
  IsActive:[true]
})

  getAllItemFlags(ItemTypeId){
    return this.http.get(environment.apiUrl+"ItemFlags/GetByItemTypes?id="+ItemTypeId);
  }

  getOneItemFlag(ItemFlagId){
    return this.http.get(environment.apiUrl+"ItemFlags/GetById?id="+ItemFlagId)
  }

  postItemFlag(body){
return this.http.post(environment.apiUrl+"ItemFlags",body)
  }

  putItemFlag(ItemFlagId,body){
    return this.http.put(environment.apiUrl+"ItemFlags/"+ItemFlagId,body)
  }

  deleteItemFlag(ItemFlagId){
    return this.http.delete(environment.apiUrl+"ItemFlags/"+ItemFlagId)
  }
}
