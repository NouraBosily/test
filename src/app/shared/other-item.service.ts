import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OtherItemService {

  constructor(private http:HttpClient) { }

  getStopDeal(ItemId){
    return this.http.get(environment.apiUrl+"ExportOrderMasters/StopDeal?ItemId="+ItemId)
  }
}
