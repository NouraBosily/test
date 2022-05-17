import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  rolesForm:FormGroup =this.fb.group({
    Id:[""],
    RoleName :["",Validators.required]
  })

rummyClaimsList:any[]=[];
whiteCheaseClaimsList:any[]=[];
leaveClaimsList:any[]=[];
missionClaimsList:any[]=[];
otherItemClaimsList:any[]=[];
basicDataClaimsList:any[]=[];
securityClaimList:any[]=[];
SalesClaimList:any[]=[];
ChartsClaimList:any[]=[];


getAuthGuard(roleClaim){
  var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var UserRole=payload.role;
  return this.http.get(environment.apiUrl+"ManageRoleClaims/getOnlyTrue?RoleId="+UserRole+"&&roleClaim="+roleClaim)
}


getRoleClaims(Id){
  return this.http.get(environment.apiUrl+"ManageRoleClaims/getALL?RoleId="+Id);
}

postRoleClaims(body){
  return this.http.post(environment.apiUrl+"ManageRoleClaims",body);
}

  getAllRoles(){
    return this.http.get(environment.apiUrl+"roles");
  }

  getOneRole(Id){
    return this.http.get(environment.apiUrl+"roles/"+Id);
  }


  postRole(body){
return this.http.post(environment.apiUrl+"roles/",body);
  }

  PutRole(Id,body){
    return this.http.put(environment.apiUrl+"roles/",body);
  }
}
