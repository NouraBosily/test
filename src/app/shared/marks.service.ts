import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MarksService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })

  getAllMarks(){
    return this.http.get(environment.apiUrl+"marks");
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
