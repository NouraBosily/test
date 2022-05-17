import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })
  getCenters(secid,space){
    return this.http.get(environment.apiUrl+"Centers1/getCenters1?id="+secid);
  }

  getMangs(secid,centid){
    return this.http.get(environment.apiUrl+"Mangments/GetManagments?id="+secid
    //+"&&cent="+centid
    );
  }
  getMangs1(secid,centid,mang){
    return this.http.get(environment.apiUrl+"Mangments1/GetManagments1?id=" +secid 
    //+"&&cent="+centid+"&&mang="+mang
    );
  }
  getMangs2(secid,centid,mang,mang1){
    return this.http.get(environment.apiUrl+"Mangments2/GetManagments2?id=" +secid 
    //+"&&cent="+centid+"&&mang="+mang+"&&mang1="+mang1
    );
  }
  
  getSectors1(){
    return this.http.get(environment.apiUrl+"Sectors1");
  }

  GetMangsForSearch(Mang){
    return this.http.get(environment.apiUrl+"devices/GetMangsForSearch?Mang="+Mang );
  }
  getMark(id){
    return this.http.get(environment.apiUrl+"marks/"+id);
  }

  getUserName(userid){
    return this.http.get(environment.apiUrl+"ApplicationUser/getUserName?UserId="+userid);
  }
  register(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Register",body);
  }

  insertMark(body){
    return this.http.post(environment.apiUrl+"marks",body);
  }

  UpdateMark(id,body){
    return this.http.put(environment.apiUrl+"marks/"+id,body);
  }
  
  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }

  deleteMark(id) {
    return this.http.delete(environment.apiUrl + 'marks/'+ id);
  }
}
