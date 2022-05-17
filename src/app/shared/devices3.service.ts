import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Devices3Service {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })

  getAllDevices(){
    return this.http.get(environment.apiUrl+"devices3");
  }

  getDevice(id){
    return this.http.get(environment.apiUrl+"devices3/"+id);
  }

  getDevices3List(deviceid,model){
    return this.http.get(environment.apiUrl+"devices3/GetDevices1?deviceid="+deviceid+"&&model="+model);
  }
  GetDevices3Count(deviceid,model){
    return this.http.get(environment.apiUrl+"devices3/GetDevices3Count?deviceid="+deviceid+"&&model="+model);
  }

  GetDevices3Structure(deviceid){
    return this.http.get(environment.apiUrl+"devices3/GetDevices3Structure?deviceid="+deviceid);
  }
  

  getAdministrationName(code){
    return this.http.get(environment.apiUrl+"devices/getAdminName?affiliatemanagement="+code);
  }
  register(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Register",body);
  }

  insertDevice(body){
    return this.http.post(environment.apiUrl+"devices",body);
  }

  UpdateDevice(id,body){
    return this.http.put(environment.apiUrl+"devices/"+id,body);
  }
  
  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }

  deleteDevice(id) {
    return this.http.delete(environment.apiUrl + 'devices3/'+ id);
  }
}
