import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemTypesService {

  constructor(private http:HttpClient) { }

  getAllItemTypesForMission(){
    return this.http.get(environment.apiUrl+"ItemTypes/GetForMission")
  }
  
  getAllItemTypes(){
    return this.http.get(environment.apiUrl+"ItemTypes/GetAll")
  }

}
