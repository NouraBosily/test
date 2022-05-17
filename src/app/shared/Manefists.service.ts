import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';  
import { HttpHeaders } from '@angular/common/http'; 
import { Server } from '../pages/model/Server';

@Injectable({
  providedIn: 'root'
})
export class ManefistsService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }

  groupForm=this.fb.group({
    MNFSTYear:["0",Validators.required],
    MNFSTRoadNo:["0",Validators.required],
   
    PortNumber:["0",Validators.required],
    ArrivalDate:["0",Validators.required],
    ShipName:["",Validators.required],
    CallSign:["",Validators.required],
  
 })

  getAvailableManefistsList(body){
    return this.http.post(environment.apiUrl+"MNFST/avalibleManifests_Post/",body);
  }

  getServerById(id){
    return this.http.get("https://localhost:44306/api/Servers/"+id).toPromise();
  }
  
}
