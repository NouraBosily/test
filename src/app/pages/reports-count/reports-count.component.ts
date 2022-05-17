import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../shared/devices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../shared/reports.service';

@Component({
  selector: 'ngx-reports-count',
  templateUrl: './reports-count.component.html',
  styleUrls: ['./reports-count.component.scss']
})
export class ReportsCountComponent implements OnInit {
  sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ];
  result;
  sectorID: any;
  centerID;
  isSearched;
  centersList;
  constructor(private reportsService: ReportsService,
    private fb: FormBuilder,
    private devicesService: DevicesService,

  ) { }
  countForm: FormGroup;
  InitializeLogin() {
    this.countForm = this.fb.group({
      SectionId: ["0", Validators.required],
      Centers:["0"]

    })

  }
  ngOnInit() {
    this.InitializeLogin();
  }


  onchangeSections(ctrl) {
    

    this.centersList=null;
    this.flag=0;
    this.devicesService.getCenters1(ctrl.id).subscribe((res: any) => {
      console.log(ctrl)
      this.isSearched=false;
          this.sectorID = ctrl.sec;
          this.result = null;

      console.log(this.sectorID)
      this.centersList = res;
      console.log(this.centersList)

    });




  }

  onchangeCenters(ctrl) {
    this.isSearched=false;

    console.log(ctrl)
    this.flag=0;
        this.centerID = ctrl;
        console.log(this.centerID)

        this.result=null;
        
  }
  /*{ id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'الطابعات' },
    { id: 3, name: 'ماكينات التصوير' },
    { id: 4, name: 'الماسح الضوئي' },
    { id: 5, name: 'أجهزة الفاكس' },
    { id: 6, name: 'الشاشات' },
    { id: 7, name: 'أخرى' }
  ];
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    { id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    { id: 4, name: 'لا يعمل قديم' }]*/
  devicesWork=0;
  devicesNotWork=0;
  printersWork=0;
  printersNotWork=0;
  photocopiersWork=0;
  photocopiersNotWork=0;
  scannersWork=0;
  scannerNotWork=0;
  faxWork=0;
  faxNotWork=0;
  screensWork=0;
  screenNotWork=0;
  otherWork=0;
  otherNotWork=0;
flag;

  GetdevicesCountForSectors(id ,type) {
    this.isSearched = true;
    console.log(this.sectorID);
    this.devicesWork=0;
    this.devicesNotWork=0;
    this.printersWork=0;
    this.printersNotWork=0;
    this.photocopiersWork=0;
    this.photocopiersNotWork=0;
    this.scannersWork=0;
    this.scannerNotWork=0;
  this.faxWork=0;
  this.faxNotWork=0;
  this.screensWork=0;
  this.screenNotWork=0;
  this.otherWork=0;
  this.otherNotWork=0;
  let code;
  if(type == 2 && id.substr(1,2)>0 && id.substr(1,2) <10)  {
    this.flag=2;
code=this.sectorID+ id.substr(1,2);
console.log(code)
  }else if(type == 2 && id.substr(1,2)>9){
    this.flag=2;
code=this.sectorID+ id.substr(1,2);
console.log(code)
  } else if(type == 1){
    this.flag=1;
    code= id;
  }
    this.reportsService.getDevicesCountForSectors(code,type).subscribe((res: any) => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].model == 1 && (res[i].printercase == 1 || res[i].printercase == 3)) {
          console.log(res[i].printercase )
          this.devicesWork += res[i].numberofdevices;
        } else if (res[i].model == 1 && (res[i].printercase == 2 || res[i].printercase == 4)) {
          this.devicesNotWork += res[i].numberofdevices;
        } else if (res[i].model == 2 && (res[i].printercase == 1 || res[i].printercase == 3)) {
          this.printersWork += res[i].numberofdevices;
        } else if (res[i].model == 2 && (res[i].printercase == 2 || res[i].printercase == 4)) {
          this.printersNotWork += res[i].numberofdevices;
        } else if (res[i].model == 3 && (res[i].printercase == 1 || res[i].printercase == 3)) {
          this.photocopiersWork += res[i].numberofdevices;
        } else if (res[i].model == 3 && (res[i].printercase == 2 || res[i].printercase == 4)) {
          this.photocopiersNotWork += res[i].numberofdevices;
        } else if (res[i].model == 4 && (res[i].printercase == 1 || res[i].printercase == 3)) {
          this.scannersWork += res[i].numberofdevices;
        } else if (res[i].model == 4 && (res[i].printercase == 2 || res[i].printercase == 4)) {
          this.scannerNotWork += res[i].numberofdevices;
        } else if (res[i].model == 5 && (res[i].printercase == 1 || res[i].printercase == 3)) {
          this.faxWork += res[i].numberofdevices;
        } else if (res[i].model == 5 && (res[i].printercase == 2 || res[i].printercase == 4)) {
          this.faxNotWork += res[i].numberofdevices;
        }else if(res[i].model ==6 &&(res[i].printercase == 1 || res[i].printercase == 3)){
          this.screensWork+=res[i].numberofdevices;
        }else if(res[i].model ==6 &&(res[i].printercase == 2 || res[i].printercase == 4)){
          this.screenNotWork+=res[i].numberofdevices;
        }else if(res[i].model ==7 &&(res[i].printercase == 1 || res[i].printercase == 3)){
          this.otherWork+=res[i].numberofdevices;
        }else if(res[i].model ==7 &&(res[i].printercase == 2 || res[i].printercase == 4)){
          this.otherNotWork+=res[i].numberofdevices;
        }
      }
      console.log('this.devicesWork '+this.devicesWork);
      console.log('this.devicesNotWork '+this.devicesNotWork);
      console.log('this.printersWork '+this.printersWork);
      console.log('this.printersNotWork '+this.printersNotWork);
      console.log('this.photocopiersWork '+this.photocopiersWork);
      console.log('this.photocopiersNotWork '+this.photocopiersNotWork);
      console.log('this.scannersWork '+this.scannersWork);
      console.log('this.scannerNotWork '+this.scannerNotWork);
      console.log('this.faxWork '+this.faxWork);
      console.log('this.faxNotWork '+this.faxNotWork);
      console.log('this.screensWork '+this.screensWork);
      console.log('this.screenNotWork '+this.screenNotWork);
      console.log('this.otherWork '+this.otherWork);
      console.log('this.otherNotWork '+this.otherNotWork);


      console.log(res)
      //this.sectorID=ctrl.id;
      this.result = res;
    });

  }

}
