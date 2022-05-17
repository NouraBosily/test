import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import { Observable } from 'rxjs';
import { RolesService } from '../../shared/roles.service';
import { NotificationService } from '../../shared/notification.service';
import { EmployeesService } from '../../shared/employees.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  RolesList$:Observable<any>;
  EmployeesList$:Observable<any>;
  submitted:boolean=false;
    constructor(private fb:FormBuilder,private route:Router,
     private serviceRoles:RolesService,
     private serviceEmployees:EmployeesService,
     private service:UsersService,
    private serviceNotify:NotificationService
     ) { }
  
    ngOnInit() {
      this.registerInitialize();
  
    }
  
    registerInitialize(){
      this.registerForm=this.fb.group({
        UserName:["",Validators.required],
        Password:["",[Validators.required,Validators.minLength(4)]],
        RoleId:["",Validators.required],
        EmployeeId:["",Validators.required]
      })
      this.RolesList$=this.serviceRoles.getAllRoles();
      this.EmployeesList$=this.serviceEmployees.getEmployeesForRegister();
  //  this.employeeList= this.serviceEmployee.getAllEmployeesForRegister();
    }
  
    get f(){
      return this.registerForm.controls;
    }
  
    onSubmit(){
      this.submitted=true;
      if(this.registerForm.invalid){
        return;
      }
      else{
        var body={
          ...this.registerForm.value
        }
        this.service.register(body).subscribe(
          (res: any) => {
            if (res.Succeeded) {
              this.submitted=false;
             this.registerInitialize();
             alert('Added Successfully');
      this.serviceNotify.success('Added Successfully');
            } 
            else {
              res.Errors.forEach(element => {
                switch (element.Code) {
                  case 'DuplicateUserName':
                      alert('Username is already taken');
               this.serviceNotify.error('Username is already taken');
                    break;
    
                  default:
                    alert(element.Description);
           this.serviceNotify.error(element.Description);
                    break;
                }
              });
            }
      });
    }
  }
  
  onclose(){
  this.route.navigate(['/pages']);
  }

}
