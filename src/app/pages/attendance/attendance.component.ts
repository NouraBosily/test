import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  constructor(private fb: FormBuilder,
  ) { }
  attendanceForm: FormGroup;
  InitializeLogin() {

      this.attendanceForm = this.fb.group({
        ID: ["0", Validators.required],
        Vacation_Type: ["0", Validators.required],
        UserXCode: ["0", Validators.required],
        EmpXCode:["",Validators.required],
        TsDate: [""],
        attendance: [false]

      })
    
  }
  ngOnInit() {
    this.InitializeLogin();
  }

}
