import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  itemForm:FormGroup=this.fb.group({
    ItemId:["0"],
    ItemDesc:["",Validators.required],
    GroupId:["",Validators.required],
    ItemTypeId:["",Validators.required],
    LessAmount:["",Validators.required],
    PurchasePrice:["0",Validators.required],
    ItemFlagId:[""],
    BeginingBalance:["0"],
    IsActive:[true]
  })
  getAllItems(ItemTypeId){
    return this.http.get(environment.apiUrl+"Items/GetAllDefault?id="+ItemTypeId);
  }

  getAllItemsDesc(ItemTypeId){
    return this.http.get(environment.apiUrl+"Items/GetItemsDesc?id="+ItemTypeId);
  }
  getMissions(ItemTypeId){
    return this.http.get(environment.apiUrl+"Items/getMissionsAndothers?ItemTypeId="+ItemTypeId)
  }
  GetItemsDescMissions(){
    return this.http.get(environment.apiUrl+"Items/GetItemsDescMissions");
  }

  getOneItem(ItemId){
    return this.http.get(environment.apiUrl+"Items/byItemId?id="+ItemId);
  }


  getItemsByGroupAndTreaters(GroupId,ItemTypeId){
    return this.http.get(environment.apiUrl+"Items/byGroupId?groupId="+GroupId+"&&itemTypeId="+ItemTypeId);
  }

  getbyGroupIdRummy(GroupId,ItemTypeId){

    return this.http.get(environment.apiUrl+"Items/byGroupIdRummy?groupId="+GroupId+"&&itemTypeId="+ItemTypeId);
   
  }



  postItem(body){
    return this.http.post(environment.apiUrl+"Items/",body);
  }

  putItem(ItemId,body){
    return this.http.put(environment.apiUrl+"Items/"+ItemId,body);
  }

  deleteItem(ItemId){
    return this.http.delete(environment.apiUrl+"Items/"+ItemId);
  }

  getAllBasicDataCount(){
    return this.http.get(environment.apiUrl+"items/GetAllCounts");
  }
}
