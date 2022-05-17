import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../shared/reports.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common'

import * as moment from 'moment';
import { DevicesService } from '../../shared/devices.service';

@Component({
  selector: 'ngx-report-devices-with-date',
  templateUrl: './report-devices-with-date.component.html',
  styleUrls: ['./report-devices-with-date.component.scss']
})
export class ReportDevicesWithDateComponent implements OnInit {
  isSearched;
  flag;
  submitted;
  reportByYearForm: FormGroup;
  displayedColumns: string[] = ["Structure", "printercase", "model", "markName", "numberofprinter", "devicemodel", "devicedate"];
  listData;
  
  sectorID: any;
  centersList: any;
  ManagmentsList: any;
  centerID: any;
  areaId;
  Managments1List: any;
  ManagmentID: any;
  CustomsAreaId: any;
  sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ];
  areasArray = [
    { id: 1, name: 'شمالية و غربية' },
    { id: 2, name: 'وسطى و جنوبية' },
    { id: 3, name: 'شرقية' }


  ];
  checked = false;
  checkeCustomsArea = false;
  checkeCustomsAreaAndSector = false;
  constructor(public service: ReportsService, private route: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private devicesService: DevicesService,

  ) { }


  ngOnInit() {
    this.isSearched = false;
    this.InitializeLogin();
    //console.log(this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber)
    this.fillYears();
  }
  InitializeLogin() {
    this.reportByYearForm = this.fb.group({
      year: ["0"],
      flag: ["", Validators.required],
      fromDate: [""],
      toDate: [""],
      SectionId: ["0"],
      Centers: ["0"],
      Managment: ["0"],
      CustomsArea: ["0"],
      SectionIdForTwoOptions: ["0"],
      CentersForTwoOptions: ["0"],
      ManagmentForTwoOptions: ["0"],
      CustomsAreaForTwoOptions: ["0"],
      checked:false,
      checkeCustomsArea:false,
      checkeCustomsAreaAndSector:false,

    })

  }
  get f() {
    return this.reportByYearForm.controls;
  }
  year;
  years;
  fillYears() {
    this.year = (new Date()).getFullYear();
    this.years = [];
    for (var i = 2010; i < 2050; i++) {
      //for (var i = this.year - 1; i < 2050; i++) {

      this.years.push(i);
    }
  }

  printyear;
  from;
  to;
  code;
  type;
  GetDevices3ReportByYearForTwoOptions(id, type,CustomsAreaId) {
    this.isSearched = true;
    console.log(this.sectorID);
    console.log(this.centerID);
    console.log(id)
    console.log(id)
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
      this.type = 1;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
      this.type = 3;

    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
      this.type = 3;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
      this.type = 4;

    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
      this.type = 4;
    }

    this.flag=1;
    var body = {
      "year": this.reportByYearForm.controls["year"].value,
"flag":this.reportByYearForm.controls["flag"].value,
    }
    this.printyear=body.year;
    console.log(body);
    this.submitted = true;
    if (this.reportByYearForm.invalid) {
      console.log(this.reportByYearForm.value);
      return;
    }

    else {
      console.log(this.code)
      this.service.GetDevices3ReportByYearForTwoOptions(body.year,this.code, type,CustomsAreaId).subscribe((res: any) => {
        console.log(res)
        this.isSearched = true;
        this.listData = res;

        /* this.listData = new MatTableDataSource(res);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator; */

      });
      //}
    }
  }
  GetDevices3ReportByYear(id, type) {
    this.isSearched = true;
    console.log(this.sectorID);
    console.log(this.centerID);
    console.log(id)
    console.log(id)
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
      console.log('jhjhj')
      this.type = 1;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
      this.type = 3;

    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
      this.type = 3;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
      this.type = 4;

    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
      this.type = 4;
    } else if (type == 2) {
      this.code = id;
      this.type = 2;
    }
    this.flag=1;
    var body = {
      "year": this.reportByYearForm.controls["year"].value,
"flag":this.reportByYearForm.controls["flag"].value,
    }
    this.printyear=body.year;
    console.log(body);
    this.submitted = true;
    if (this.reportByYearForm.invalid) {
      console.log(this.reportByYearForm.value);
      return;
    }

    else {
      console.log(this.code)
      this.service.GetDevices3ReportByYear(body.year,this.code, type).subscribe((res: any) => {
        console.log(res)
        this.isSearched = true;
        this.listData = res;

        /* this.listData = new MatTableDataSource(res);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator; */

      });
      //}
    }
  }
  onSelectcheckedCheckbox(event){
    if(this.reportByYearForm.controls["checked"].value == true){
      console.log('checked')
      this.reportByYearForm.controls["checkeCustomsArea"].disable();
      this.reportByYearForm.controls["checkeCustomsAreaAndSector"].disable();
      this.checked = true;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    }else if(this.reportByYearForm.controls["checked"].value == false){
      console.log('checked')
      this.reportByYearForm.controls["checkeCustomsArea"].enable();
      this.reportByYearForm.controls["checkeCustomsAreaAndSector"].enable();
      this.checked = false;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    } 
  }
  onSelectcheckeCustomsAreaCheckbox(event){
console.log(event);

 if(this.reportByYearForm.controls["checkeCustomsArea"].value == true){
  console.log('checkeCustomsArea')
  this.reportByYearForm.controls["checked"].disable();
  this.reportByYearForm.controls["checkeCustomsAreaAndSector"].disable();
  this.checked = false;
  this.checkeCustomsArea = true;
  this.checkeCustomsAreaAndSector = false;

}else if(this.reportByYearForm.controls["checkeCustomsArea"].value == false){
  console.log('checkeCustomsArea')
  this.reportByYearForm.controls["checked"].enable();
  this.reportByYearForm.controls["checkeCustomsAreaAndSector"].enable();
  this.checked = false;
  this.checkeCustomsArea = false;
  this.checkeCustomsAreaAndSector = false;
}
  }
  onSelectcheckeCustomsAreaAndSectorCheckbox(event){
 if(this.reportByYearForm.controls["checkeCustomsAreaAndSector"].value == true){
  console.log('checkeCustomsAreaAndSector')
  this.reportByYearForm.controls["checked"].disable();
  this.reportByYearForm.controls["checkeCustomsArea"].disable();
  this.checked = false;
  this.checkeCustomsArea = false;
  this.checkeCustomsAreaAndSector = true;
}else if(this.reportByYearForm.controls["checkeCustomsAreaAndSector"].value == false){
  console.log('checkeCustomsAreaAndSector')
  this.reportByYearForm.controls["checked"].enable();
  this.reportByYearForm.controls["checkeCustomsArea"].enable();
  this.checked = false;
  this.checkeCustomsArea = false;
  this.checkeCustomsAreaAndSector = false;
}
  }
  onchangeSections(ctrl) {
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.devicesService.getCenters1(ctrl.id).subscribe((res: any) => {
        this.sectorID = ctrl.sec;
        console.log(this.sectorID)
        this.centersList = res;
        console.log(this.centersList)

      });


    }

  }


  onchangeCustomsAreas(ctrl) {
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      console.log(ctrl)
      this.CustomsAreaId = ctrl.id;
    }

  }

  onchangeCenters(ctrl) {
    this.ManagmentsList = null;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      //let centerid=this.centersList[ctrl-1].ID;
      this.devicesService.getMangments(ctrl).subscribe((res: any) => {
        this.devicesService.getCenters1ByID(ctrl).subscribe((res: any) => {

          this.centerID = res.cent;
          console.log(this.centerID)

        })
        //this.centerID = ctrl;
        //console.log(this.centerID)
        this.ManagmentsList = res;
        console.log(this.ManagmentsList)
      });
    }
  }
  onchangeManagments(ctrl) {
    this.Managments1List = null;

    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.devicesService.getMangments1(ctrl).subscribe((res: any) => {
        this.ManagmentID = ctrl;
        console.log(this.ManagmentID)
        this.Managments1List = res;
        console.log(this.Managments1List)
      });
    }
  }
  GetDevices3ReportByTwoOptions(id, type, CustomsAreaId) {
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
      this.type = 1;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
      this.type = 3;

    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
      this.type = 3;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
      this.type = 4;

    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
      this.type = 4;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
      this.type = 4;
    }
//this.flag=0;
    console.log(this.reportByYearForm.value)
    let fromDate= moment(this.reportByYearForm.controls["fromDate"].value).local().toDate();
        let toDate=moment(this.reportByYearForm.controls["toDate"].value).local().toDate();
        var monthfromDate = fromDate.getUTCMonth() + 1; //months from 1-12
var dayfromDate = fromDate.getUTCDate();
var yearfromDate = fromDate.getUTCFullYear();
var hoursfromDate = fromDate.getUTCHours();
var minutesfromDate = fromDate.getUTCMinutes();
var secondsfromDate = fromDate.getUTCSeconds();
        
var date1 = yearfromDate + "-" + monthfromDate + "-" + dayfromDate + " " + hoursfromDate + ":" + minutesfromDate + ":" + secondsfromDate;
console.log(date1);
this.from=yearfromDate + "-" + monthfromDate + "-" + dayfromDate ;
var monthtoDate = toDate.getUTCMonth() + 1; //months from 1-12
var daytoDate = toDate.getUTCDate();
var yeartoDate = toDate.getUTCFullYear();
var hourstoDate = toDate.getUTCHours();
var minutestoDate = toDate.getUTCMinutes();
var secondstoDate = toDate.getUTCSeconds();
        
var date2 = yeartoDate + "-" + monthtoDate + "-" + daytoDate + " " + hourstoDate + ":" + minutestoDate + ":" + secondstoDate;
this.to=yeartoDate + "-" + monthtoDate + "-" + daytoDate;
console.log(date2);

  console.log(fromDate)
    console.log(toDate)
    if(this.reportByYearForm.controls["flag"].value == 1){
    this.service.GetDevices3ReportByTwoDatesForTwoOptions(date1,date2,this.code, type, CustomsAreaId).subscribe((res: any) => {
      this.isSearched = true;

      this.listData = res;
      console.log(res)

      
    });
  }else if(this.reportByYearForm.controls["flag"].value == 2){
    console.log(this.code)
      this.service.GetDevices3ReportByYearForTwoOptions(this.reportByYearForm.controls["year"].value,this.code, type,CustomsAreaId).subscribe((res: any) => {
        console.log(res)
        this.isSearched = true;
        this.listData = res;

        /* this.listData = new MatTableDataSource(res);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator; */

      });
  }

  }
}
