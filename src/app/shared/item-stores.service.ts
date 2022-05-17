import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemStoresService {

  constructor(private http:HttpClient) { }

getCurrentBalancePatch(ItemId,PatchNumber,StoreId,ItemsStandardId){
  return this.http.get(environment.apiUrl+"ItemStores/GetCurrentPatchBalance?ItemId="+ItemId+"&&PatchNumber="+PatchNumber+"&&StoreId="+StoreId+"&&ItemsStandardId="+ItemsStandardId);
}

getCurrentBalance(ItemId,StoreId){
  return this.http.get(environment.apiUrl+"ItemStores/GetCurrentBalance?ItemId="+ItemId+"&&StoreId="+StoreId);
}

getCurrentAmountAndWeight(ItemId,StoreId,ItemsStandardId){
  return this.http.get(environment.apiUrl+"ItemStores/GetCurrentAmountAndWeight?ItemId="+ItemId+"&&StoreId="+StoreId+"&&ItemsStandardId="+ItemsStandardId);
}


getItemStoreForWhiteChease(ItemTypeId){
  return this.http.get(environment.apiUrl+"ItemStores/GetItemStoreForAll?id="+ItemTypeId);
}
}
