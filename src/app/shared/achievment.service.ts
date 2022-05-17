import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderNeedsItem } from '../pages/model/OrderNeedsItem';

@Injectable({
  providedIn: 'root'
})
export class AchievmentService {



  constructor(private http:HttpClient,    
    ) { }
 
  
 

  getAchievmentsForOrderDetailsID(OrderDetailsID){
    return this.http.get(environment.apiUrl+"Achievements/getAchievmentsForOrderDetailsID?id="+OrderDetailsID);
  }
  getAchievmentByID(achievmentID){
    return this.http.get(environment.apiUrl+"Achievements/getAchievmentByID?id="+achievmentID);
  }

  insertAchievmentChild(code,serial, body){
    return this.http.post(environment.apiUrl+"Achievements/postAchievements?code="+code+'&&serial='+serial,body);
  }

  UpdateAchievment(id,serial,body){
    return this.http.put(environment.apiUrl+"Achievements/putAchievements?id="+id+"&&serial="+serial,body);
  }
  deleteAchievment(id,serial) {
    return this.http.delete(environment.apiUrl + 'Achievements/deleteAchievements?id='+ id+'&&serial='+serial);
  }
  
  getOrderNeedsDetails(id){
    return this.http.get(environment.apiUrl+"OrderNeedsDetails/"+id);
  }

  GetOrderNeedsById(id){
    return this.http.get(environment.apiUrl+"orderneeds/GetOrderNeedsById?id="+id);
  }

  
  
  
  
  getDevice(id){
    return this.http.get(environment.apiUrl+"devices3/"+id);
  }

  getDevices3List(deviceid,model){
    return this.http.get(environment.apiUrl+"devices3/GetDevices1?deviceid="+deviceid+"&&model="+model);
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

  

  UpdateDevice(id,body){
    return this.http.put(environment.apiUrl+"devices/"+id,body);
  }
  
  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }

  deleteOrder(deviceid, id) {
    return this.http.delete(environment.apiUrl + 'orderneeds/'+deviceid+'/'+ id);
  }
}
