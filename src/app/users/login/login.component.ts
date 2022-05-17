import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../shared/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private service: UsersService, private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/pages');
    }
    else {
      this.InitializeLogin();
    }
  }

  InitializeLogin() {
    this.loginForm = this.fb.group({
      user: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(3)]],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      var body = {
        ...this.loginForm.value
      }
      console.log(body);
      this.service.login(body).subscribe(
        (res: any) => {
          console.log("loginnnnnnnnnnn");
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', this.loginForm.get('user').value);
          console.log('user', localStorage.getItem('user'));
          //if(body.type == "2"){

            var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
            let UserType = payload.UserType;
            if(UserType == 1){
              this.router.navigateByUrl('/pages');

            }else if(UserType == 2) {
              this.router.navigateByUrl('/pages/availabldevicesmangs');

            }


          //window.location.reload();
          //}else{
            //this.router.navigateByUrl('/pages/sub');
         //window.location.reload();
          //}

        },
        err => {
          if (err.status == 400) {
            alert('Incorrect username or password.');
          }

          else {
            console.log(err);
          }
        }
      );
    }
  }
}
