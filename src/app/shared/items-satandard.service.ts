import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemsSatandardService {

  constructor(private http:HttpClient) { }
  
  getAllItemsStandard(ItemTypeId){
    return this.http.get(environment.apiUrl+"ItemsStandards/"+ItemTypeId);
  }
}
