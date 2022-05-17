import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Devices3ChildService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })

  getAllDevices(){
    return this.http.get(environment.apiUrl+"devices3");
  }

  getAllMarks(){
    return this.http.get(environment.apiUrl+"marks");
  }

  getDevice(id){
    return this.http.get(environment.apiUrl+"devices3/"+id);
  }

  getDevices3List(deviceid,model){
    return this.http.get(environment.apiUrl+"devices3/GetDevices1?deviceid="+deviceid+"&&model="+model);
  }
  getAdministrationName(code){
    return this.http.get(environment.apiUrl+"devices/getAdminName?affiliatemanagement="+code);
  }

  insertDevice(body){
    return this.http.post(environment.apiUrl+"devices3",body);
  }

  UpdateDevice(id,body){
    return this.http.put(environment.apiUrl+"devices3/"+id,body);
  }
  

}
