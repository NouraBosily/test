import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  

  constructor(private http:HttpClient,private fb:FormBuilder) { }
  jobsForm:FormGroup=this.fb.group({
    JobId:["0"],
    JobDesc:["",Validators.required],
    DepartMentId:["",Validators.required],
    IsActive:[true]
  })
  
  getAllJobs(){
    return this.http.get(environment.apiUrl+"Jobs")
  }

  getOneJob(JobId){
    return this.http.get(environment.apiUrl+"Jobs/"+JobId)
  }

  postJob(body){
    return this.http.post(environment.apiUrl+"Jobs",body)
  }
  putJob(JobId,body){
    return this.http.put(environment.apiUrl+"Jobs/"+JobId,body)
  }
deleteJob(JobId){
return this.http.delete(environment.apiUrl+"Jobs/"+JobId)
}




}
