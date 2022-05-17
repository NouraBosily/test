import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })

  getAllDevices(){
    return this.http.get(environment.apiUrl+"devices");
  }

  getDevice(id){
    return this.http.get(environment.apiUrl+"devices/GetdevicesByID?id="+id);
  }
  GetdevicesNeedsDatesByID(id){
    return this.http.get(environment.apiUrl+"devices/GetdevicesNeedsDatesByID?id="+id);
  }
  
  CheckIfDeviseInserted(code){
    return this.http.get(environment.apiUrl+"devices/CheckIfDeviseInserted?code="+code);
  }
  
  
  getDevice1(id){
    return this.http.get(environment.apiUrl+"devices/Getdevices?id="+id);
  }
  GetdevicesNeedsForSectorCenters(code,type){
    return this.http.get(environment.apiUrl+"devices/GetdevicesNeedsForSectorCenters?code="+code+'&&type='+type);
  }
  GetdevicesNeedsForSectorCentersAndCustomsArea(code,type,CustomsAreaId){
    return this.http.get(environment.apiUrl+"devices/GetdevicesNeedsForSectorCentersAndCustomsArea?code="+code+'&&type='+type+'&&customsArea='+CustomsAreaId);
  }
  
  getSectors1(){
    return this.http.get(environment.apiUrl+"Sectors1");
  }
  getCenters1(id){
    return this.http.get(environment.apiUrl+"centers1/getCenters1?id="+id);
  }
  getCenters1ByID(id){
    return this.http.get(environment.apiUrl+"centers1/"+id);
  }
  
  getMangments(id){
    return this.http.get(environment.apiUrl+"Mangments/GetManagments?id="+id);
  }

  getMangments1(id){
    return this.http.get(environment.apiUrl+"Mangments1/GetManagments1?id="+id);
  }

  getMangments2(id){
    return this.http.get(environment.apiUrl+"Mangments2/GetManagments2?id="+id);
  }

  getUserName(userid){
    return this.http.get(environment.apiUrl+"ApplicationUser/getUserName?UserId="+userid);
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
  PutDevices3List(id,body){
    return this.http.put(environment.apiUrl+"devices3/PutDevices3List?deviceid="+id, body);
  }
  
  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }

  deleteDevice(id) {
    return this.http.delete(environment.apiUrl + 'devices/'+ id);
  }

  deleteDevices3ForDevices(id) {
    return this.http.delete(environment.apiUrl + 'devices3/deleteDevices3ForDevices?deviceid='+ id);
  }

  
}
