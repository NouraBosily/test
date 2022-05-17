import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SubAgentService } from '../../shared/sub-agent.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../shared/reports.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DepartmentsComponent } from '../departments/departments.component';
import { DetailsReportComponent } from '../details-report/details-report.component';
import { DatePipe } from '@angular/common';
import { DevicesService } from '../../shared/devices.service';

@Component({
  selector: 'ngx-reportmangements-not-have-devices',
  templateUrl: './reportmangements-not-have-devices.component.html',
  styleUrls: ['./reportmangements-not-have-devices.component.scss']
})
export class ReportmangementsNotHaveDevicesComponent implements OnInit {

  code;
  type;
  flag;
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    { id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    { id: 4, name: 'لا يعمل قديم' }];

  deviceTypeArray = [
    { id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'طابعات' },
    { id: 3, name: 'ماكينات تصوير' },
    { id: 4, name: 'ماسح ضوئي' },
    { id: 5, name: 'أجهزة فاكس' },
    //{ id: 6, name: 'شاشات' },
    { id: 6, name: 'أخرى' }
  ];

  containsOrNotContainArray = [
    { id: 1, type: 1, desc: "يوجد بها" },
    { id: 2, type: 2, desc: "لا يوجد بها" }];
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  listData;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["Structure", "CustomsArea", "Notes"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
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
  sectorID: any;
  centersList: any;
  ManagmentsList: any;
  centerID: any;
  Managments1List: any;
  ManagmentID: any;
  CustomsAreaId: any;
  isSearched;
  constructor(public service: ReportsService, private route: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    public devicesService: DevicesService
  ) { }

  ngOnInit() {
    this.isSearched = false;

    this.InitializeLogin();

  }
  isValid;
  length1: number;
  submitted;
  containOrNotContainForm: FormGroup;
  InitializeLogin() {
    this.containOrNotContainForm = this.fb.group({
      deviceType: ["", Validators.required],
      containOrNotContain: ["", Validators.required],
      SectionId: ["0"],
      Centers: ["0"],
      Managment: ["0"],
      CustomsArea: ["0"],
      SectionIdForTwoOptions: ["0"],
      CentersForTwoOptions: ["0"],
      ManagmentForTwoOptions: ["0"],
      CustomsAreaForTwoOptions: ["0"]
    })

  }


  GetdevicesNeedsForSectorCenters(id, type) {
    console.log(this.sectorID);
    console.log(this.centerID);
    console.log(id)
    console.log(id)
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
    } else if (type == 2) {
      this.code = id;
    }
    var body = {
      "deviceType": this.containOrNotContainForm.controls["deviceType"].value,
      "containOrNotContain": this.containOrNotContainForm.controls["containOrNotContain"].value,
      "code": this.code,
      "type": type
    }
    this.type = body.deviceType;
    this.flag = body.containOrNotContain;
    console.log(this.type)
    console.log(this.flag)
    console.log(body);
    this.submitted = true;
    if (this.containOrNotContainForm.invalid) {
      this.isValid = false;
      console.log(this.containOrNotContainForm.value);
      return;
    }

    else {
      this.service.GetdevicesContainOrNotContain(body.code, body.type, body.deviceType, body.containOrNotContain).subscribe((res: any) => {
        console.log(res)
        this.isValid = true;
        this.isSearched = true;
        this.listData = res;
      });

    }
  }


  GetdevicesNeedsForSectorCentersAndCustomsArea(id, type,customAreaId) {
    console.log(this.sectorID);
    console.log(this.centerID);
    console.log(id)
    console.log(id)
    console.log(customAreaId)
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
    } 
    var body = {
      "deviceType": this.containOrNotContainForm.controls["deviceType"].value,
      "containOrNotContain": this.containOrNotContainForm.controls["containOrNotContain"].value,
      "code": this.code,
      "type": type,
      
    }
    this.type = body.deviceType;
    this.flag = body.containOrNotContain;
    console.log(this.type)
    console.log(this.flag)
    console.log(body);
    this.submitted = true;
    if (this.containOrNotContainForm.invalid) {
      this.isValid = false;
      console.log(this.containOrNotContainForm.value);
      return;
    }

    else {
      this.service.GetdevicesContainOrNotContainForSectorsAndCustomsArea(body.code, body.type, body.deviceType, body.containOrNotContain,customAreaId).subscribe((res: any) => {
        console.log(res)
        this.isValid = true;
        this.isSearched = true;
        this.listData = res;
      });

    }
  }

  showDetails(id, model, printercase) {

    let deviceid = id;
    console.log(deviceid + "-----" + model + "------" + printercase)
    let space = 3;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { deviceid, model, printercase }
    this.dialog.open(DetailsReportComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      /*else {
        console.log(result)
        console.log("result.affiliatemanagement " + result.cod)
        console.log("result.IDRelation " + result.ID)

        
        //this.deviceForm.controls["name"].setValue(result.name1 + " / " + result.name);
        this.deviceForm.controls["affiliatemanagement"].setValue(result.cod);
        this.deviceForm.controls["IDRelation"].setValue(result.ID);
        this.deviceForm.controls["Structure"].setValue(result.Structure);

        

        
        console.log(result)
      }*/
    })


  }

  year;
  years;
  setAll() {
    this.ManagmentsList = null;
    this.centersList = null;
    this.centerID = null;
    this.ManagmentID = null;
    this.sectorID = null;
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

  fillYears() {
    this.year = (new Date()).getFullYear();
    this.years = [];
    for (var i = 2010; i < 2050; i++) {
      //for (var i = this.year - 1; i < 2050; i++) {

      this.years.push(i);
    }
  }

  get f() {
    return this.containOrNotContainForm.controls;
  }

}
