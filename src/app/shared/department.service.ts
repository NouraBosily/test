import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
departmentForm:FormGroup=this.fb.group({
  DepartMentId:["0"],
  DepartMentDesc:["",Validators.required],
  IsActive:[true]
})
getAuthGuard(roleClaim){
  var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var UserRole=payload.role;
  return this.http.get(environment.apiUrl+"ManageRoleClaims/getOnlyTrue?RoleId="+UserRole+"&&roleClaim="+roleClaim)
}

  getAllDepartments(){
    return this.http.get(environment.apiUrl+"DepartMents");
  }
  getOneDepartment(DepartMentId){
    return this.http.get(environment.apiUrl+"DepartMents/"+DepartMentId);
  }

  postDepartment(body){
    return this.http.post(environment.apiUrl+"DepartMents/",body);
  }

  putDepartment(DepartMentId,body){
    return this.http.put(environment.apiUrl+"DepartMents/"+DepartMentId,body);
  }

  deleteDepartment(DepartMentId){
    return this.http.delete(environment.apiUrl+"DepartMents/"+DepartMentId);
  }

}
