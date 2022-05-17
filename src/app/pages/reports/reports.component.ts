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
import { PrinterCase } from '../model/PrinterCase';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { flatten } from '@angular/compiler';
import { DevicesService } from '../../shared/devices.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  type;
  case;
  length;
  code;
  typeSectorOrCustomsArea;
  printercasetype;
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
    { id: 6, name: 'شاشات' },
    { id: 7, name: 'أخرى' }
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  isSearched;
  cases: number[];
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
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  listData;  
  valid;
  submitted;
  deviceForm: FormGroup;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["Structure", "numberofprinter"];
  types: number[];
  typesLength: number;
  modeltype: string;

  

  constructor(public service: ReportsService, private route: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private devicesService: DevicesService,
  ) { }

  ngOnInit() {
    this.isSearched = false;
    this.InitializeLogin();
  }

  InitializeLogin() {
    this.deviceForm = this.fb.group({
      printercase: [["0", "0", "0", "0"], Validators.required],
      type: [["0", "0", "0", "0","0","0","0"], Validators.required],
      SectionId: ["0"],
      Centers: ["0"],
      Managment: ["0"],
      CustomsArea: ["0"],
      SectionIdForTwoOptions: ["0"],
      CentersForTwoOptions: ["0"],
      ManagmentForTwoOptions: ["0"],
      CustomsAreaForTwoOptions: ["0"],
      checked: false,
      checkeCustomsArea: false,
      checkeCustomsAreaAndSector: false,

    })

  }
  onchangeCase(ctrl) {

    console.log(ctrl.id)
    console.log(ctrl.value)

  }

  onchangeType(ctrl) {

    console.log(ctrl.id)
    console.log(ctrl.value)

  }
  onSubmit(id, type) {
    this.isSearched = true;
    console.log(this.sectorID);
    console.log(this.centerID);
    console.log(id)
    console.log(id)
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
      console.log('jhjhj')
      console.log(this.code)
      this.typeSectorOrCustomsArea = 1;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
      this.typeSectorOrCustomsArea = 3;

    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
      this.typeSectorOrCustomsArea = 3;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
      this.typeSectorOrCustomsArea = 4;

    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
      this.typeSectorOrCustomsArea = 4;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
      this.typeSectorOrCustomsArea = 4;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
      this.typeSectorOrCustomsArea = 4;
    } else if (type == 2) {
      this.code = id;
      this.typeSectorOrCustomsArea = 2;
    }
    //this.isSearched=true;
    this.cases = this.deviceForm.controls['printercase'].value;
    console.log(this.cases)
    if (this.cases.length == 1 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name;
      console.log(this.printercasetype)
      this.cases[1] = 0
      this.cases[2] = 0
      this.cases[3] = 0
      this.length = 1;
    } else if (this.cases.length == 2 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4) && (this.cases[1] == 1 || this.cases[1] == 2 || this.cases[1] == 3 || this.cases[1] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name;
      this.cases[2] = 0
      this.cases[3] = 0
      this.length = 2;

    }
    else if (this.cases.length == 3 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4) && (this.cases[1] == 1 || this.cases[1] == 2 || this.cases[1] == 3 || this.cases[1] == 4)
      && (this.cases[2] == 1 || this.cases[2] == 2 || this.cases[2] == 3 || this.cases[2] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name + ',' + this.printercaseArray[this.cases[2] - 1].name;
      this.cases[3] = 0
      this.length = 3;

    } else {
      console.log(this.cases)
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name + ',' + this.printercaseArray[this.cases[2] - 1].name
        + ',' + this.printercaseArray[this.cases[3] - 1].name;
      this.length = 4;
    }

    /////////////////////
    this.types = this.deviceForm.controls['type'].value;
    console.log(this.types)
    if (this.types.length == 1 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name;
      console.log(this.modeltype)
      this.types[1] = 0
      this.types[2] = 0
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 1;
      console.log(this.typesLength)
    } else if (this.types.length == 2 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name;
      this.types[2] = 0
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      console.log(this.types)
      this.typesLength = 2;
      console.log(this.types)
      console.log(this.modeltype)
      console.log("this.typesLength "+this.typesLength)
    }
    else if (this.types.length == 3 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name;
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 3;
      console.log(this.modeltype)
      console.log("this.typesLength "+this.typesLength)
      console.log(this.types)
    } else if (this.types.length == 4 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name;
        console.log(this.modeltype)

      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 4;
      console.log("this.typesLength "+this.typesLength)
    } else if (this.types.length == 5 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)
      && (this.types[4] == 1 || this.types[4] == 2 || this.types[4] == 3 || this.types[4] == 4 || this.types[4] == 5 || this.types[4] == 6 || this.types[4] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name + ',' + this.deviceTypeArray[this.types[4] - 1].name;
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 5;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    } else if (this.types.length == 6 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)
      && (this.types[4] == 1 || this.types[4] == 2 || this.types[4] == 3 || this.types[4] == 4 || this.types[4] == 5 || this.types[4] == 6 || this.types[4] == 7)
      && (this.types[5] == 1 || this.types[5] == 2 || this.types[5] == 3 || this.types[5] == 4 || this.types[5] == 5 || this.types[5] == 6 || this.types[5] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name  + ',' + this.deviceTypeArray[this.types[4] - 1].name  + ',' + this.deviceTypeArray[this.types[5] - 1].name;
      this.types[6] = 0
      this.typesLength = 6;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    } else {
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name  + ',' + this.deviceTypeArray[this.types[4] - 1].name  + ',' + this.deviceTypeArray[this.types[5] - 1].name+ 
        ',' + this.deviceTypeArray[this.types[6] - 1].name;
      //this.types[6] = 0
      this.typesLength = 7;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    }
    console.log(this.cases)
    for (let i = 0; i < this.cases.length; i++) {
      console.log("Technology Id: " + this.cases[i]);
      console.log("Technology Name: " + this.cases[i]);
    }

    var body = {
      "printercase": this.deviceForm.controls["printercase"].value,
      "type": this.deviceForm.controls["type"].value

    }
    this.type = body.type;
    this.case = body.printercase;
    console.log(body);
    this.submitted = true;
    if (this.deviceForm.invalid) {
      console.log(this.deviceForm.value);
      return;
    }

    else {
      console.log(this.cases)
      this.service.getReportModelAndCase(this.types, this.cases,this.code,this.typeSectorOrCustomsArea).subscribe((res: any) => {
        console.log(res)
        this.isSearched = true;
        this.listData = res;
        this.cases.length = this.length;
        this.types.length = this.typesLength;
        console.log(this.cases)
        //this.cases=[0,0,0,0]
      });

    }
  }

  GetDevices3ReportByTwoOptions(id, type, CustomsAreaId) {
    if (type == 1) {
      this.code = this.sections[id - 1].sec;
      this.typeSectorOrCustomsArea = 1;
    } else if (type == 3 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + id;
      this.typeSectorOrCustomsArea = 3;

    } else if (type == 3 && id > 9) {
      this.code = this.sectorID + id;
      this.typeSectorOrCustomsArea = 3;
    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 0 && id < 10) {
      this.code = this.sectorID + "0" + this.centerID + "0" + id;
      this.typeSectorOrCustomsArea = 4;

    } else if (type == 4 && this.centerID > 0 && this.centerID < 10 && id > 10) {
      this.code = this.sectorID + "0" + this.centerID + id;
      this.typeSectorOrCustomsArea = 4;
    } else if (type == 4 && this.centerID > 10 && id > 0 && id < 10) {
      this.code = this.sectorID + this.centerID + "0" + id;
      this.typeSectorOrCustomsArea = 4;
    } else if (type == 4 && this.centerID > 10 && id > 10) {
      this.code = this.sectorID + this.centerID + id;
      this.typeSectorOrCustomsArea = 4;
    }
    //this.isSearched=true;
    this.cases = this.deviceForm.controls['printercase'].value;
    console.log(this.cases)
    if (this.cases.length == 1 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name;
      console.log(this.printercasetype)
      this.cases[1] = 0
      this.cases[2] = 0
      this.cases[3] = 0
      this.length = 1;
    } else if (this.cases.length == 2 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4) && (this.cases[1] == 1 || this.cases[1] == 2 || this.cases[1] == 3 || this.cases[1] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name;
      this.cases[2] = 0
      this.cases[3] = 0
      this.length = 2;

    }
    else if (this.cases.length == 3 && (this.cases[0] == 1 || this.cases[0] == 2 || this.cases[0] == 3 || this.cases[0] == 4) && (this.cases[1] == 1 || this.cases[1] == 2 || this.cases[1] == 3 || this.cases[1] == 4)
      && (this.cases[2] == 1 || this.cases[2] == 2 || this.cases[2] == 3 || this.cases[2] == 4)) {
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name + ',' + this.printercaseArray[this.cases[2] - 1].name;
      this.cases[3] = 0
      this.length = 3;

    } else {
      console.log(this.cases)
      this.printercasetype = this.printercaseArray[this.cases[0] - 1].name + ',' + this.printercaseArray[this.cases[1] - 1].name + ',' + this.printercaseArray[this.cases[2] - 1].name
        + ',' + this.printercaseArray[this.cases[3] - 1].name;
      this.length = 4;
    }
    console.log(this.cases)
    for (let i = 0; i < this.cases.length; i++) {
      console.log("Technology Id: " + this.cases[i]);
      console.log("Technology Name: " + this.cases[i]);
    }

    //////////////////////////
    this.types = this.deviceForm.controls['type'].value;
    console.log(this.types)
    if (this.types.length == 1 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name;
      console.log(this.modeltype)
      this.types[1] = 0
      this.types[2] = 0
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 1;
      console.log(this.typesLength)
    } else if (this.types.length == 2 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name;
      this.types[2] = 0
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      console.log(this.types)
      this.typesLength = 2;
      console.log(this.types)
      console.log(this.modeltype)
      console.log("this.typesLength "+this.typesLength)
    }
    else if (this.types.length == 3 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)) {
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name;
      this.types[3] = 0
      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 3;
      console.log(this.modeltype)
      console.log("this.typesLength "+this.typesLength)
      console.log(this.types)
    } else if (this.types.length == 4 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name;
        console.log(this.modeltype)

      this.types[4] = 0
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 4;
      console.log("this.typesLength "+this.typesLength)
    } else if (this.types.length == 5 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)
      && (this.types[4] == 1 || this.types[4] == 2 || this.types[4] == 3 || this.types[4] == 4 || this.types[4] == 5 || this.types[4] == 6 || this.types[4] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name + ',' + this.deviceTypeArray[this.types[4] - 1].name;
      this.types[5] = 0
      this.types[6] = 0
      this.typesLength = 5;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    } else if (this.types.length == 6 && (this.types[0] == 1 || this.types[0] == 2 || this.types[0] == 3 || this.types[0] == 4 || this.types[0] == 5 || this.types[0] == 6
      || this.types[0] == 7) && 
    (this.types[1] == 1 || this.types[1] == 2 || this.types[1] == 3 || this.types[1] == 4 || this.types[1] == 5 || this.types[1] == 6 || this.types[1] == 7)
      && (this.types[2] == 1 || this.types[2] == 2 || this.types[2] == 3 || this.types[2] == 4 || this.types[2] == 5 || this.types[2] == 6 || this.types[2] == 7)
      && (this.types[3] == 1 || this.types[3] == 2 || this.types[3] == 3 || this.types[3] == 4 || this.types[3] == 5 || this.types[3] == 6 || this.types[3] == 7)
      && (this.types[4] == 1 || this.types[4] == 2 || this.types[4] == 3 || this.types[4] == 4 || this.types[4] == 5 || this.types[4] == 6 || this.types[4] == 7)
      && (this.types[5] == 1 || this.types[5] == 2 || this.types[5] == 3 || this.types[5] == 4 || this.types[5] == 5 || this.types[5] == 6 || this.types[5] == 7)){
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name  + ',' + this.deviceTypeArray[this.types[4] - 1].name  + ',' + this.deviceTypeArray[this.types[5] - 1].name;
      this.types[6] = 0
      this.typesLength = 6;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    } else {
      console.log(this.types)
      this.modeltype = this.deviceTypeArray[this.types[0] - 1].name + ',' + this.deviceTypeArray[this.types[1] - 1].name + ',' + this.deviceTypeArray[this.types[2] - 1].name
        + ',' + this.deviceTypeArray[this.types[3] - 1].name  + ',' + this.deviceTypeArray[this.types[4] - 1].name  + ',' + this.deviceTypeArray[this.types[5] - 1].name+ 
        ',' + this.deviceTypeArray[this.types[6] - 1].name;
      //this.types[6] = 0
      this.typesLength = 7;
      console.log("this.typesLength "+this.typesLength)
      console.log(this.modeltype)
    }
    console.log(this.cases)
    for (let i = 0; i < this.cases.length; i++) {
      console.log("Technology Id: " + this.cases[i]);
      console.log("Technology Name: " + this.cases[i]);
    }

    var body = {
      "printercase": this.deviceForm.controls["printercase"].value,
      "type": this.deviceForm.controls["type"].value

    }
    this.type = body.type;
    this.case = body.printercase;
    console.log(body);
    this.submitted = true;
    if (this.deviceForm.invalid) {
      console.log(this.deviceForm.value);
      return;
    }

    else {
      console.log(this.cases)
      console.log(this.typeSectorOrCustomsArea)
      console.log(body.type)
      console.log(this.types)

      this.service.Getdevices3ReportForCaseAndModelForTwoOptions(this.types, this.cases,this.code,this.typeSectorOrCustomsArea,CustomsAreaId).subscribe((res: any) => {
        console.log(body.type)

        console.log(res)
        this.isSearched = true;
        this.listData = res;
        this.cases.length = this.length;
        this.types.length = this.typesLength;

        console.log(this.cases)
        //this.cases=[0,0,0,0]
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
    })


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
  onSelectcheckedCheckbox(event) {
    if (this.deviceForm.controls["checked"].value == true) {
      console.log('checked')
      this.deviceForm.controls["checkeCustomsArea"].disable();
      this.deviceForm.controls["checkeCustomsAreaAndSector"].disable();
      this.checked = true;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    } else if (this.deviceForm.controls["checked"].value == false) {
      console.log('checked')
      this.deviceForm.controls["checkeCustomsArea"].enable();
      this.deviceForm.controls["checkeCustomsAreaAndSector"].enable();
      this.checked = false;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    }
  }
  onSelectcheckeCustomsAreaCheckbox(event) {
    console.log(event);

    if (this.deviceForm.controls["checkeCustomsArea"].value == true) {
      console.log('checkeCustomsArea')
      this.deviceForm.controls["checked"].disable();
      this.deviceForm.controls["checkeCustomsAreaAndSector"].disable();
      this.checked = false;
      this.checkeCustomsArea = true;
      this.checkeCustomsAreaAndSector = false;

    } else if (this.deviceForm.controls["checkeCustomsArea"].value == false) {
      console.log('checkeCustomsArea')
      this.deviceForm.controls["checked"].enable();
      this.deviceForm.controls["checkeCustomsAreaAndSector"].enable();
      this.checked = false;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    }
  }
  onSelectcheckeCustomsAreaAndSectorCheckbox(event) {
    if (this.deviceForm.controls["checkeCustomsAreaAndSector"].value == true) {
      console.log('checkeCustomsAreaAndSector')
      this.deviceForm.controls["checked"].disable();
      this.deviceForm.controls["checkeCustomsArea"].disable();
      this.checked = false;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = true;
    } else if (this.deviceForm.controls["checkeCustomsAreaAndSector"].value == false) {
      console.log('checkeCustomsAreaAndSector')
      this.deviceForm.controls["checked"].enable();
      this.deviceForm.controls["checkeCustomsArea"].enable();
      this.checked = false;
      this.checkeCustomsArea = false;
      this.checkeCustomsAreaAndSector = false;
    }
  }
}
