import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UsersService } from '../../shared/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { Devices3ChildService } from '../../shared/devices3child.service';
import { Mark } from '../model/Mark';
import { Devices3Service } from '../../shared/devices3.service';
import { DevicesService } from '../../shared/devices.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CentersService } from '../../shared/centers.service';

@Component({
  selector: 'ngx-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss']
})
export class CreateCenterComponent implements OnInit {

  code;
  type;
  sectorID;
  centersList;
  ManagmentsList;
  centerID;
  Managments1List;
  ManagmentID;
  Managments2List;
  Managment1ID;
  Managment2ID; device3id: any;
  constructor(private activeRoute: ActivatedRoute,
    public service: CentersService,
    public service1: DevicesService,

    public servicedevices3: Devices3Service,
    private dialog: MatDialog,
    private route: Router,

    private fb: FormBuilder,
    private route1: ActivatedRoute,
    private notificationService: NotificationService,
  ) { }
  deviceid;
  id;
  submitted: boolean = false;
  mangForm: FormGroup;
  sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ]
  InitializeLogin() {
    this.mangForm = this.fb.group({
      ID: ["0", Validators.required],
      sec: ["", Validators.required],
      cent: ["", Validators.required],
      mang: ["", Validators.required],
      mang1: ["", Validators.required],
      mang2: ["", Validators.required],
      space: ["", Validators.required],
      name: ["", Validators.required],
      cod: ["", Validators.required],
      del: [""],
      Field10: [""],
      Sectors1ID: ["", Validators.required],
      Structure: ["", Validators.required],
      SectionId: ["0", Validators.required],
      Centers: ["0"],
      Managment: ["0"],
      Managment1: ["0"],
      Managment2: ["0"],
      CentralMangName: [""],
      GeneralMangName: [""],
      BranchMangName: [""],
      affiliateMangName: [""]
    })
  }
  dd;
  ngOnInit() {
    this.code = this.route1.snapshot.paramMap.get('mangId');


    this.InitializeLogin();
    if (this.activeRoute.snapshot.paramMap.get('mangId') == null) {


      this.InitializeLogin();

    } else {
      let id = this.activeRoute.snapshot.paramMap.get("mangId");

      this.service.getCenters1ByCenterID(id).subscribe((res: any) => {
        this.dd = res.deviceid;
        this.mangForm.setValue({
          ID: res.ID,
          sec: res.sec,
          cent: res.cent,
          mang: res.mang,
          mang1: res.mang1,
          mang2: res.mang2,
          space: res.space,
          name: res.name,
          cod: res.cod,
          del: res.del,
          Field10: res.Field10,
          Sectors1ID: res.Sectors1ID,
          Structure: res.Structure,

        });
      });
    }
  }
  onchangeSections(ctrl) {
    this.centersList = null;
    this.ManagmentsList = null;
    this.Managments1List = null;
    this.Managments2List = null;
    this.mangForm.controls["CentralMangName"].setValue("");
    this.mangForm.controls["GeneralMangName"].setValue("");
    this.mangForm.controls["BranchMangName"].setValue("");
    this.mangForm.controls["affiliateMangName"].setValue("");

    console.log(ctrl.name)
    //this.sectorID=ctrl.id;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      console.log(ctrl.sec)
      this.service1.getCenters1(this.sections[ctrl.sec - 1].id).subscribe((res: any) => {
        this.sectorID = ctrl.sec;
        console.log(this.sectorID)
        this.centersList = res;
        console.log(this.centersList)
      });
    }
  }

  onchangeCenters(ctrl) {
    console.log(this.centersList)
    let idd = this.centersList.filter(
      center => center.ID === ctrl);
    console.log(idd)
    this.ManagmentsList = null;    
    this.Managments2List = null;
    this.Managments1List = null;

    this.mangForm.controls["GeneralMangName"].setValue("");
    this.mangForm.controls["BranchMangName"].setValue("");
    this.mangForm.controls["affiliateMangName"].setValue("");
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service1.getMangments(ctrl).subscribe((res: any) => {
        this.centerID = ctrl;
        console.log(this.centerID)
        this.ManagmentsList = res;
        console.log(this.ManagmentsList)
      });
    }
  }

  onchangeManagments(ctrl) {
    this.Managments1List = null;
    this.Managments2List = null;

    this.mangForm.controls["BranchMangName"].setValue("");
    this.mangForm.controls["affiliateMangName"].setValue("");
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service1.getMangments1(ctrl).subscribe((res: any) => {
        this.ManagmentID = ctrl;
        console.log(this.ManagmentID)
        this.Managments1List = res;
        console.log(this.Managments1List)
      });
    }
  }

  onchangeManagments1(ctrl) {
    this.Managments2List = null;
    this.mangForm.controls["affiliateMangName"].setValue("");
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service1.getMangments2(ctrl).subscribe((res: any) => {
        this.Managment1ID = ctrl;
        console.log(this.Managment1ID)
        this.Managments2List = res;
        console.log(this.Managments2List)
      });
    }
  }

  onchangemanagments2(ctrl) {
    this.Managment2ID = ctrl;

  }
  InsertCenters1(id) {
    let name = this.mangForm.controls["CentralMangName"].value;
    console.log(id)
    let sectorName = this.sections[id - 1].name;
    let ID = this.sections[id - 1].id;

    let Structure = name + '/' + sectorName;
    console.log(Structure)
    var body = {
      sec: id,
      name: name,
      Structure: Structure,
      ID: ID,
      Sectors1ID: this.sections[id - 1].id
    }
    this.service.postCenters1(body).subscribe((res: any) => {
      console.log(res);
      this.notificationService.success('تم الإدراج بنجاح');

    });
  }

  InsertMangments(centerID) {
    let name = this.mangForm.controls["GeneralMangName"].value;
    console.log(centerID)
    let centerParent = this.centersList.filter(
      center => center.ID === centerID);
    console.log(centerParent)
    let centerStructure = centerParent[0].Structure;
    console.log(centerStructure);
    let mangStructure = name + '/' + centerStructure;
    let centwithOrWithout0
    if (centerParent[0].cent < 10) {
      centwithOrWithout0 = '0' + centerParent[0].cent;
    } else if (centerParent[0].cen >= 10) {
      centwithOrWithout0 = centerParent[0].cent;
    }
    var body = {
      sec: centerParent[0].sec,
      cent: centwithOrWithout0,
      name: name,
      Structure: mangStructure,
      Centers1ID: centerParent[0].ID,
      space: 4
    }
    console.log(body);
    this.service.postMangments(body).subscribe((res: any) => {
      console.log(res);
      this.notificationService.success('تم الإدراج بنجاح');
    });

  }
  InsertMangments1(ManagmentID) {
    let name = this.mangForm.controls["BranchMangName"].value;
    console.log(ManagmentID)
    let mangParent = this.ManagmentsList.filter(
      mang => mang.ID === ManagmentID);
    console.log(mangParent)
    let mangStructure = mangParent[0].Structure;
    console.log(mangStructure);
    let mang1Structure = name + '/' + mangStructure;
    var body = {
      sec: mangParent[0].sec,
      cent: mangParent[0].cent,
      mang: mangParent[0].mang,
      name: name,
      Structure: mang1Structure,
      MangmentsID: mangParent[0].ID,
      space: 5
    }
    console.log(body);
    this.service.postMangments1(body).subscribe((res: any) => {
      console.log(res);
      this.notificationService.success('تم الإدراج بنجاح');
    });
  }
  InsertMangments2(Managment1ID) {
    let name = this.mangForm.controls["affiliateMangName"].value;
    console.log(Managment1ID)
    let mang1Parent = this.Managments1List.filter(
      mang1 => mang1.ID === Managment1ID);
    console.log(mang1Parent)
    let mang1Structure = mang1Parent[0].Structure;
    console.log(mang1Structure);
    let mang2Structure = name + '/' + mang1Structure;
    var body = {
      sec: mang1Parent[0].sec,
      cent: mang1Parent[0].cent,
      mang: mang1Parent[0].mang,
      mang1: mang1Parent[0].mang1,
      name: name,
      Structure: mang2Structure,
      Mangments1ID: mang1Parent[0].ID,
      space: 6
    }
    console.log(body);
    this.service.postMangments2(body).subscribe((res: any) => {
      console.log(res);
      this.notificationService.success('تم الإدراج بنجاح');
    });
  }
  onSubmit() {
    let name = this.mangForm.controls["name"].value;
    console.log(name)

    this.submitted = true;
    if (this.mangForm.invalid) {
      console.log(this.mangForm.value);
      return;
    }

    else {
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.mangForm.value)
        this.service.postCenters1(this.mangForm.value).subscribe((res: any) => {
          console.log('-----------------');
          console.log(res);
          this.device3id = res.id;
          this.notificationService.success('تم الإدراج بنجاح');


          //this.route.navigate(["/pages/devicechild/edit/" + this.device3id + "/" + this.code + "/" + this.type]);

        }
        );
        //console.log(this.objectDevice)

      } else {
        console.log(this.mangForm.value)
        this.service.putCenters1(this.id, this.mangForm.value).subscribe(res => {
          this.notificationService.success('تم التعديل بنجاح');
        });
      }
    }
  }

  /*
    onSubmit() {
      this.submitted = true;
      if (this.mangForm.invalid) {
        console.log(this.mangForm.value);
        return;
      }
  
      else {
        if (this.activeRoute.snapshot.paramMap.get('id') == null) {
          console.log(this.mangForm.value)
          this.service.insertDevice(this.mangForm.value).subscribe((res: any) => {
            console.log('-----------------');
            console.log(res);
            this.device3id = res.id;
            this.notificationService.success('تم الإدراج بنجاح');
            this.servicedevices3.GetDevices3Count(this.deviceid, this.type).subscribe((res: any) => {
              if (res.sums.length > 0) {
                this.devicesListLength = res.sums[0].numberofdevices;
                console.log(this.devicesListLength)
                console.log("this.devicesListLength)");
              } else {
                this.devicesListLength = 0;
              }
            });
  
          
            this.route.navigate(["/pages/devicechild/edit/" + this.device3id + "/" + this.code + "/" + this.type]);
  
          }
          );
          console.log(this.objectDevice)
  
        } else {
          console.log(this.mangForm.value)
          this.service.UpdateDevice(this.id, this.mangForm.value).subscribe(res => {
            this.notificationService.success('تم التعديل بنجاح');
            this.servicedevices3.GetDevices3Count(this.dd, this.type).subscribe((res: any) => {
              if (res.sums.length > 0) {
                this.devicesListLength = res.sums[0].numberofdevices;
                console.log(this.devicesListLength)
                console.log("this.devicesListLength)");
              } else {
                this.devicesListLength = 0;
              }
            });
  
            
  
          });
        }
      }
    }
  
    goToAllDevices() {
      console.log(this.dd)
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
  
        this.route.navigate(['/pages/computers/' + this.deviceid + '/' + this.type + '/' + this.code]);
      } else {
        this.route.navigate(['/pages/computers/' + this.dd + '/' + this.type + '/' + this.code]);
  
      }
  
    }
  
    get f() {
      return this.mangForm.controls;
    }
  
  */
}
