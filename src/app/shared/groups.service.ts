import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  groupsForm:FormGroup=this.fb.group({
    GroupId:["0"],
    GroupDesc:["",Validators.required],
    TreaterId:["",Validators.required],
    IsActive:[true],
 
  })

  getAllGroups(){
    return this.http.get(environment.apiUrl+"Groups/getActiveGroups")
  }

  getActiveAndOthers(){
    return this.http.get(environment.apiUrl+"Groups/getAllGroups")
  }


  getOneGroup(GroupId){
    return this.http.get(environment.apiUrl+"Groups/byId?id="+GroupId)
  }

  getGroupsByPatchNumber(PatchNumber){
    return this.http.get(environment.apiUrl+"Groups/byPatchNumber?PatchNumber="+PatchNumber);
  }
  
  getGroupsByTreater(TreaterId){
   return this.http.get(environment.apiUrl+"Groups/byTreaterId?TreaterId="+TreaterId);
  }

  postGroup(body){
    return this.http.post(environment.apiUrl+"Groups",body)
  }

  putGroup(GroupId,body){
    return this.http.put(environment.apiUrl+"Groups/"+GroupId,body)
  }

  deleteGroup(GroupId){
    return this.http.delete(environment.apiUrl+"Groups/"+GroupId)
  }
}
