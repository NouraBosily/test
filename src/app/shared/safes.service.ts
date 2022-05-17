import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SafesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  safeForm:FormGroup=this.fb.group({
    SafeId:["0",Validators.required],
    SafeName:["",Validators.required],
    FlagSafe:["",Validators.required],
    IsActive:["",Validators.required]
  
  })

  getAllSafes(){
    return this.http.get(environment.apiUrl+"safes");
  }

  getSafesByFlag(FlagSafe){
    return this.http.get(environment.apiUrl+"safes/byFlag?id="+FlagSafe);
  }

  getOneSafe(Id){
return this.http.get(environment.apiUrl+"safes/byId?id="+Id)
  }

  postSafe(body){
    return this.http.post(environment.apiUrl+"safes",body);
  }
  putSafe(id,body)
  {
    return this.http.put(environment.apiUrl+"safes/"+id,body);
  }
  deleteSafe(id){
    return this.http.delete(environment.apiUrl+"safes/"+id);
  }
  }
  

