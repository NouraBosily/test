import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SubAgentService } from '../../shared/sub-agent.service';
import { DatePipe } from '@angular/common'

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../shared/reports.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DepartmentsComponent } from '../departments/departments.component';
import { DetailsReportComponent } from '../details-report/details-report.component';
import { DevicesService } from '../../shared/devices.service';
@Component({
  selector: 'ngx-reports-needs',
  templateUrl: './reports-needs.component.html',
  styleUrls: ['./reports-needs.component.scss']
})
export class ReportsNeedsComponent implements OnInit {
  deviceTypeArray = [
    { id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'طابعات' },
    { id: 3, name: 'ماكينات تصوير' },
    { id: 4, name: 'ماسح ضوئي' },
    { id: 5, name: 'أجهزة فاكس' },
    { id: 6, name: 'شاشات' },
    { id: 7, name: 'أخرى' }
  ];
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
  listData;
  checked = false;
  checkeCustomsArea = false;
  checkeCustomsAreaAndSector = false;

  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["Structure", "numberofprinter"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  isSearched;
  sectorID: any;
  centersList: any;
  ManagmentsList: any;
  centerID: any;
  areaId;
  Managments1List: any;
  ManagmentID: any;
  CustomsAreaId: any;
  constructor(public service: ReportsService, private route: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private devicesService: DevicesService,
    public datepipe: DatePipe,


  ) { }

  ngOnInit() {
    this.InitializeLogin();
    this.service.GetdevicesNeeds().subscribe((res: any) => {
      console.log(res)
      this.isSearched = true;
      this.listData = res;
      console.log(res[0].OrderNeeds)
    });
    this.isSearched = false;

    //this.InitializeLogin();

  }
  valid;
  length1: number;
  submitted;
  orderNeedsForm: FormGroup;
  InitializeLogin() {
    this.orderNeedsForm = this.fb.group({
      SectionId: ["0"],
      Centers: ["0"],
      Managment: ["0"],
      CustomsArea: ["0"],
      SectionIdForTwoOptions: ["0"],
      CentersForTwoOptions: ["0"],
      ManagmentForTwoOptions: ["0"],
      CustomsAreaForTwoOptions: ["0"]
      /* checked:["0"],
      checkeCustomsArea:[""] */
    })

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
  code;
  type;
  GetdevicesNeedsForSectorCenters(id, type) {
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
    } else if (type == 2) {
      this.code = id;
      this.type = 2;
    }
    this.devicesService.GetdevicesNeedsForSectorCenters(this.code, type).subscribe((res: any) => {
      console.log(res);
      this.listData = res;
      console.log(res[0].OrderNeeds[0].OrderItems[0].achievements)
    });

  }
  GetdevicesNeedsForSectorCentersAndCustomsArea(id, type, CustomsAreaId) {
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
    this.devicesService.GetdevicesNeedsForSectorCentersAndCustomsArea(this.code, type, CustomsAreaId).subscribe((res: any) => {
      console.log(res);
      this.listData = res;
      console.log(res[0].OrderNeeds[0].OrderItems[0].achievements)
    });

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
  flag;
  setAll(event) {
    console.log(event)
    if (event.source.id == "checked") {
      console.log('checked');
      this.flag = 1;

    } else if (event.source.id == "checkeCustomsArea") {
      console.log('checkeCustomsArea');
      this.flag = 2;
      this.centerID = null;
      this.sectorID = null;

    } else if (event.source.id == "checkeCustomsAreaAndSector") {
      console.log('checkeCustomsAreaAndSector');
      this.flag = 3;
    }
    /* if(checked == true){
      this.ManagmentsList=null;
      this.centersList=null;
      this.centerID=null;
      this.ManagmentID=null;
     this.sectorID=null;
    } */

    //this.sections=null;
  }
  showManagmentDevices(ManagmentID) {
    console.log(ManagmentID)
    this.devicesService.getDevice1(ManagmentID).subscribe((res: any) => {
      //this.sectorID=ctrl.id;
      //console.log(this.sectorID)
      console.log(res);
      this.listData = res;

    });
  }


}


