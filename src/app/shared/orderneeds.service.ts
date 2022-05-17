import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderNeedsItem } from '../pages/model/OrderNeedsItem';

@Injectable({
  providedIn: 'root'
})
export class OrderNeedsService {



  constructor(private http:HttpClient,    
    private fb: FormBuilder,
    ) { }
  orderItems : OrderNeedsItem[];
  needsForm: FormGroup=this.fb.group({
    ID: ["0", Validators.required],
    DeviceId: ["0", Validators.required],
    Done: [""],        
    OrderDate:[""],
    DeletedOrderItemIDs:[""]
  });
  
 

  getAllOrderNeeds(serial){
    return this.http.get(environment.apiUrl+"orderneeds/GetOrderNeeds?id="+serial);
  }
  getOrderNeedsDetails(id){
    return this.http.get(environment.apiUrl+"OrderNeedsDetails/"+id);
  }

  GetOrderNeedsById(id){
    return this.http.get(environment.apiUrl+"orderneeds/GetOrderNeedsById?id="+id);
  }

  
  saveOrUpdateOrder(id, needsForm){
    
    var body = {
      ...this.needsForm.value,
      OrderItems: this.orderItems
    };
    var s={"DeviceId": "1504",
    "Done": 1,
    "ID": "0",
    "OrderDate": "2021-02-27 00:00:00.000",
     "OrderItems":[{
            "DeviceModel": "ss",
    "ID": "0",
    "Mark": 2,
    "NumberOf": 1,
    "OrderNeedsID": null,
    "Type": 2
        },{"DeviceModel": "dd",
    "ID": "0",
    "Mark": "2",
    "NumberOf": "2",
    "OrderNeedsID": null,
    "Type": "4"}]}
    console.log('------------------------')
    console.log(body)
    return this.http.post(environment.apiUrl + 'OrderNeeds/'+id, body);
  }
  insertOrderNeedsDetails(body){
    return this.http.post(environment.apiUrl+"OrderNeedsDetails",body);
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
