import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private route:Router,private service:UsersService) { }

  ngOnInit() {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/users/login');
  
    
  
  }

}
