import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required]
  })

  getAllUsers(){
    return this.http.get(environment.apiUrl+"ApplicationUser/getAll");
  }

  getUser(id){
    return this.http.get(environment.apiUrl+"ApplicationUser/"+id);
  }

  getUserName(userid){
    return this.http.get(environment.apiUrl+"ApplicationUser/getUserName?UserId="+userid);

  }
  register(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Register",body);
  }

  login(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Login",body);
  }

  UpdateUser(id,body){
    return this.http.put(environment.apiUrl+"ApplicationUser/"+id,body);
  }
  
  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }

  deleteUser(id) {
    return this.http.delete(environment.apiUrl + 'ApplicationUser/'+ id);
  }
}
