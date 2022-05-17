import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { DevicesService } from '../../shared/devices.service';
import { CentersService } from '../../shared/centers.service';
import { CreateCenterComponent } from '../create-center/create-center.component';

@Component({
  selector: 'ngx-create-management',
  templateUrl: './create-management.component.html',
  styleUrls: ['./create-management.component.scss']
})
export class CreateManagementComponent implements OnInit {
  deviceForm: FormGroup;
  sectorID;
  centersList;
  ManagmentsList;
  centerID;
  Managments1List;
  ManagmentID;
  Managments2List;
  Managment1ID;
  Managment2ID;
  RadioValue;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] ;
  flag;
  //= ["ID","name", "sec", "cent", "mang", "mang1", "mang2", "Sectors1ID","Centers1ID","MangmentsID","Mangments1ID", "space", "Structure", "actions"];
  sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ]
  constructor(private fb: FormBuilder,
    private service: DevicesService,
    private centers1Service: CentersService,
    private dialog: MatDialog,
    private route1: Router,
    private route: Router,
    private notificationService: NotificationService) { }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.InitializeForm();
    //this.showSections();

  }

  InitializeForm() {

    this.deviceForm = this.fb.group({
      SectionId: ["0", Validators.required],
      Centers: ["0"],
      Managment: ["0"],
      Managment1: ["0"],
      Managment2: ["0"],
      CentralMangName: [""],
      GeneralMangName: [""]

    })

  }

  onchangeSections(ctrl) {    
    this.centersList = null;
    this.ManagmentsList = null;
    this.Managments1List = null;
    this.Managments2List = null;
    this.displayedColumns= [
      //"ID",
      "name", 
      //"sec", "cent", "mang", "mang1", "mang2", "Sectors1ID", "space",
       "Structure", "actions"]
    this.flag=1;
    console.log(ctrl.name)
    //this.sectorID=ctrl.id;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      console.log(ctrl.sec)
      this.service.getCenters1(this.sections[ctrl.sec-1].id).subscribe((res: any) => {
        this.sectorID = this.sections[ctrl.sec-1].id;
        console.log(this.sectorID)
        this.centersList = res;
        console.log(this.centersList)
        this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }
  }
  centerStructure;
  onchangeCenters(ctrl) {
    this.ManagmentsList = null;   
    this.Managments1List = null;    
    this.Managments2List = null;    
    this.displayedColumns= [
      //"ID",
      "name", 
      //"sec", "cent", "mang", "mang1", "mang2", "Centers1ID", "space", 
      "Structure", "actions"];
    this.flag=2;
    console.log(this.centersList)
    let idd = this.centersList.filter(
      book => book.ID === ctrl);
    console.log(idd)
    this.ManagmentsList = null;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments(ctrl).subscribe((res: any) => {
        this.centerID = ctrl;
        console.log(this.centerID)
        this.ManagmentsList = res;
        console.log(this.ManagmentsList)
        this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }
  }

  onchangeManagments(ctrl) {
    this.Managments1List = null;
    this.Managments2List = null;  
    this.displayedColumns=[
      //"ID",
      "name", 
      //"sec", "cent", "mang", "mang1", "mang2", "MangmentsID", "space", 
      "Structure", "actions"];
    this.flag=3;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments1(ctrl).subscribe((res: any) => {
        this.ManagmentID = ctrl;
        console.log(this.ManagmentID)
        this.Managments1List = res;
        console.log(this.Managments1List)
        this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }
  }

  onchangeManagments1(ctrl) {
    this.Managments2List = null;
this.displayedColumns=[
  //"ID",
  "name",
  // "sec", "cent", "mang", "mang1", "mang2", "Mangments1ID", "space", 
  "Structure", "actions"];
this.flag=4;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments2(ctrl).subscribe((res: any) => {
        this.Managment1ID = ctrl;
        console.log(this.Managment1ID)
        this.Managments2List = res;
        console.log(this.Managments2List)
        this.listData = new MatTableDataSource(res);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    }
  }

  onchangemanagments2(ctrl) {
    this.Managment2ID = ctrl;

  }

  /*showSectorDevices(id){

    console.log(id)
    this.service.getDevice1(id).subscribe((res: any) => {
      console.log(res);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }*/

  InsertCenters1(id) {
    let name = this.deviceForm.controls["CentralMangName"].value;
    console.log(id)
    let sectorName = this.sections[id - 1].name;
    let ID = this.sections[id - 1].id;

    let Structure = name + '/' + sectorName;
    console.log(Structure)
    var body = {
      sec: id,
      name: name,
      Structure: Structure,
      ID: ID
    }
    this.centers1Service.postCenters1(body).subscribe((res: any) => {
      console.log(res);

    });
  }

  InsertMangments(centerID) {
    let name = this.deviceForm.controls["GeneralMangName"].value;
    console.log(centerID)
    /*let sectorName=this.sections[id-1].name;
    let ID=this.sections[id-1].id;

    let Structure=name+'/'+sectorName;
    console.log(Structure)
    var body={
      sec:id,
      name:name,
      Structure:Structure,
      ID:ID
    }
    this.centers1Service.postMangments(body).subscribe((res: any) => {
      console.log(res);
    
    });*/
  }
  showSections() {
    this.service.getSectors1().subscribe((res: any) => {
      //this.sectorID=ctrl.id;
      //console.log(this.sectorID)
      console.log(res);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }
  onCreate() {
    console.log(this.sectorID)
    this.route1.navigate(['/pages/create-center/add' ]);
      /*let space = 3;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "60%";
      dialogConfig.data = { space }
      this.dialog.open(CreateCenterComponent, dialogConfig).afterClosed().subscribe(result => {
        if (!result) {
          return
        }
        else {
          this.deviceForm.controls["affiliatemanagement"].setValue(result.cod);
          this.deviceForm.controls["IDRelation"].setValue(result.ID);
          this.deviceForm.controls["Structure"].setValue(result.Structure);
  
  
        }
      })*/
  
   

  }
  onEdit(mangId,flag) {
    console.log(mangId);
    console.log(flag);
    this.route1.navigate(["/pages/edit-management/" + mangId+"/"+flag]);
  }
  onSubmit() {

  }
}
