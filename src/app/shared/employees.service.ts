import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  employeesForm:FormGroup=this.fb.group({
    EmployeeId:["0"],
    EmployeeName:["",Validators.required],
    JobId:["",Validators.required],
    HireDate:["",Validators.required],
    Graduation:["",Validators.required],
    MainSalary:["",Validators.required],
    IsActive:[true],
    IsLogIn:[false]
  })

  getAllEmployees(){
    return this.http.get(environment.apiUrl+"Employees/GetAll");
  }

  getEmployeeName(){
 return this.http.get(environment.apiUrl+"Employees/getEmployeeName");
  }

  getAllEmployeesStores(){
    return this.http.get(environment.apiUrl+"Employees/EmployesStores")
  }

  getOneEmployee(EmployeeId){
return this.http.get(environment.apiUrl+"Employees/"+EmployeeId);
  }

  postEmployee(body){
    return this.http.post(environment.apiUrl+"Employees",body);

  }

  putEmployee(EmployeeId,body){
    return this.http.put(environment.apiUrl+"Employees/"+EmployeeId,body);
  }

  deleteEmployee(EmployeeId){
    return this.http.delete(environment.apiUrl+"Employees/"+EmployeeId);
  }

  getEmployeesForRegister(){
    return this.http.get(environment.apiUrl+"Employees/GetForRegister")
  }


}
