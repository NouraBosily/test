import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UsersService } from '../../shared/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
    public service: UsersService,
    private dialog: MatDialog,
    private route: Router,
    private fb: FormBuilder,
    private router:Router,
    private notificationService: NotificationService,
  ) { }
  id;
  submitted: boolean = false;
  userForm: FormGroup;
  usersTypeArray = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];
  InitializeLogin() {
    this.userForm = this.fb.group({
      ID: ["0", Validators.required],
      flag: ["", Validators.required],
      user: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(3)]],
      enddate: ["", Validators.required],
      startdate: ["", Validators.required],
      dateentry: new Date(),
    })
  }
  ngOnInit() {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let UserType = payload.UserType;
    if(UserType == 2){
    this.router.navigateByUrl('/pages/forbidden');
    }
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.InitializeLogin();
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.InitializeLogin();

    } else {
      let id = this.activeRoute.snapshot.paramMap.get("id");
      this.service.getUser(parseInt(this.id)).subscribe((res: any) => {
        this.userForm.setValue({
          ID: id,
          flag: res.flag,
          enddate: res.enddate,
          startdate: res.startdate,
          dateentry: res.dateentry,
          password: res.password,
          user: res.user,
        });
      });
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log(this.userForm.value);
      return;
    }

    else {
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.userForm.value)
        this.service.register(this.userForm.value).subscribe(res => {
          console.log(this.userForm.value)
          this.notificationService.success('تم الإدراج بنجاح');
          this.route.navigate(['/pages/availableusers']);
        }
        );
      } else {
        this.service.UpdateUser(this.id, this.userForm.value).subscribe(res => {
          this.notificationService.success('تم التعديل بنجاح');
        });
      }
    }
  }

  get f() {
    return this.userForm.controls;
  }

}
