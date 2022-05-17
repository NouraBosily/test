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
export class ServerService {

  constructor(private http:HttpClient) { }

  getServersList(){
    return this.http.get("https://localhost:44306/api/Servers");
  }

  getServerById(id){
    return this.http.get("https://localhost:44306/api/Servers/"+id).toPromise();
  }
}
