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

@Component({
  selector: 'ngx-create-device-child',
  templateUrl: './create-device-child.component.html',
  styleUrls: ['./create-device-child.component.scss']
})
export class CreateDeviceChildComponent implements OnInit {
  code;
  type;
  devicesListLength: any;
  objectDevice: any;
  body: { serial: any; Notes: any; devicesthatneedmaintenance: any; scanner: any; photocopiers: any; printers: any; CustomsArea: any; affiliatemanagement: any; publicadministration: any; centraldepartments: any; sector: any; fax: any; other: any; username: any; usereditor: any; note: any; insertdate: any; IDRelation: any; Structure: any; needs: any; needsOrderDate: any; ForOrder: any; numberofdevices: any; };
  device3id: any;
  constructor(private activeRoute: ActivatedRoute,
    public service: Devices3ChildService,
    public service1: DevicesService,

    public servicedevices3: Devices3Service,
    private dialog: MatDialog,
    private route: Router,
    private _adapter: DateAdapter<any>,

    private fb: FormBuilder,
    private route1: ActivatedRoute,
    private notificationService: NotificationService,
  ) { }
  deviceid;
  id;
  submitted: boolean = false;
  userForm: FormGroup;
  deviceTypeArray = [
    { id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'الطابعات' },
    { id: 3, name: 'ماكينات التصوير' },
    { id: 4, name: 'الماسح الضوئي' },
    { id: 5, name: 'أجهزة الفاكس' },
    { id: 6, name: 'الشاشات' },
    { id: 7, name: 'أخرى' }
  ];
  MarksArray: Mark[];
  name;
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    { id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    { id: 4, name: 'لا يعمل قديم' }]

  InitializeLogin() {
    this.userForm = this.fb.group({
      id: ["0", Validators.required],
      printercase: ["", Validators.required],
      model: [this.type, Validators.required],
      mark: ["", Validators.required],
      numberofprinter: ["", Validators.required],
      publicadministration: [""],
      deviceid: [this.deviceid, Validators.required],
      cod: [this.code, Validators.required],
      type1: [""],
      status: [""],
      devicemodel: [""],
      insertDate: new Date(),
      devicedate: [""]
    })
  }
  dd;
  ngOnInit() {
    this.code = this.route1.snapshot.paramMap.get('code');
    console.log(this.code)
    this.type = this.route1.snapshot.paramMap.get('type');
    console.log(this.type)
    this.deviceid = this.route1.snapshot.paramMap.get('serial');
    this.id = this.route1.snapshot.paramMap.get('id');
    console.log(this.id)
    console.log(this.deviceid)
    this._adapter.setLocale('ar');
    this.service.getAllMarks().subscribe((res1: Mark[]) => {
      this.MarksArray = res1;
    });
    this.service.getAdministrationName(this.code).subscribe((res: any) => {
      this.name = res.name;
      console.log(res)
    });
    this.InitializeLogin();
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.service.getAllMarks().subscribe((res: Mark[]) => {
        this.MarksArray = res;
      })

      this.InitializeLogin();

    } else {
      let id = this.activeRoute.snapshot.paramMap.get("id");

      this.service.getDevice(parseInt(this.id)).subscribe((res: any) => {
        this.dd = res.deviceid;
        this.userForm.setValue({
          id: this.id,
          printercase: res.printercase,
          model: res.model,
          mark: res.mark,
          numberofprinter: res.numberofprinter,
          publicadministration: res.publicadministration,
          deviceid: res.deviceid,
          cod: res.cod,
          type1: res.type1,
          status: res.status,
          devicemodel: res.devicemodel,
          devicedate: res.devicedate,
          insertDate: res.insertDate

        });
      });
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log(this.userForm.value);
      return;
    }

    else {
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.userForm.value)
        this.service.insertDevice(this.userForm.value).subscribe((res: any) => {
          console.log('-----------------');
          console.log(res);
          this.device3id = res.id;
          this.notificationService.success('تم الإدراج بنجاح');
          // get count of devices3
          this.servicedevices3.GetDevices3Count(this.deviceid, this.type).subscribe((res: any) => {
            if (res.sums.length > 0) {
              this.devicesListLength = res.sums[0].numberofdevices;
              console.log(this.devicesListLength)
              console.log("this.devicesListLength)");
            } else {
              this.devicesListLength = 0;
            }
          });

          /*this.service1.getDevice(this.deviceid).subscribe((res: any) => {
            this.objectDevice = res;
            console.log(this.objectDevice)
            console.log(res)

            if (this.type == 1) {
              this.body = {
                "serial": this.deviceid,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "scanner": this.objectDevice.scanner,
                "photocopiers": this.objectDevice.photocopiers,
                "printers": this.objectDevice.printers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "fax": this.objectDevice.fax,
                "other": this.objectDevice.other,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
                "numberofdevices": this.devicesListLength,

              }
            } else if (this.type == 2) {
              this.body = {
                "serial": this.deviceid,
                "printers": this.devicesListLength,
                "numberofdevices": this.objectDevice.numberofdevices,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "scanner": this.objectDevice.scanner,
                "photocopiers": this.objectDevice.photocopiers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "fax": this.objectDevice.fax,
                "other": this.objectDevice.other,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
              }
            } else if (this.type == 3) {
              this.body = {
                "serial": this.deviceid,
                "photocopiers": this.devicesListLength,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "scanner": this.objectDevice.scanner,
                "printers": this.objectDevice.printers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "fax": this.objectDevice.fax,
                "other": this.objectDevice.other,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
                "numberofdevices": this.objectDevice.numberofdevices,
              }
            } else if (this.type == 4) {
              this.body = {
                "serial": this.deviceid,
                "scanner": this.devicesListLength,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "photocopiers": this.objectDevice.photocopiers,
                "printers": this.objectDevice.printers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "fax": this.objectDevice.fax,
                "other": this.objectDevice.other,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
                "numberofdevices": this.objectDevice.numberofdevices,
              }
            } else if (this.type == 5) {
              this.body = {
                "serial": this.deviceid,
                "fax": this.devicesListLength,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "scanner": this.objectDevice.scanner,
                "photocopiers": this.objectDevice.photocopiers,
                "printers": this.objectDevice.printers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "other": this.objectDevice.other,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
                "numberofdevices": this.objectDevice.numberofdevices,
              }
            } else if (this.type == 7) {
              this.body = {
                "serial": this.deviceid,
                "other": this.devicesListLength,
                "Notes": this.objectDevice.Notes,
                "devicesthatneedmaintenance": this.objectDevice.devicesthatneedmaintenance,
                "scanner": this.objectDevice.scanner,
                "photocopiers": this.objectDevice.photocopiers,
                "printers": this.objectDevice.printers,
                "CustomsArea": this.objectDevice.CustomsArea,
                "affiliatemanagement": this.objectDevice.affiliatemanagement,
                "publicadministration": this.objectDevice.publicadministration,
                "centraldepartments": this.objectDevice.centraldepartments,
                "sector": this.objectDevice.sector,
                "fax": this.objectDevice.fax,
                "username": this.objectDevice.username,
                "usereditor": this.objectDevice.usereditor,
                "note": this.objectDevice.note,
                "insertdate": this.objectDevice.insertdate,
                "IDRelation": this.objectDevice.IDRelation,
                "Structure": this.objectDevice.Structure,
                "needs": this.objectDevice.needs,
                "needsOrderDate": this.objectDevice.needsOrderDate,
                "ForOrder": this.objectDevice.ForOrder,
                "numberofdevices": this.objectDevice.numberofdevices,
              }
            }
            this.service1.UpdateDevice(this.deviceid, this.body).subscribe(res => {

              //this.notificationService.success('تم التعديل بنجاح');
            });
          });*/
          this.route.navigate(["/pages/devicechild/edit/" + this.device3id + "/" + this.code + "/" + this.type]);

        }
        );
        console.log(this.objectDevice)

      } else {
        console.log(this.userForm.value)
        this.service.UpdateDevice(this.id, this.userForm.value).subscribe(res => {
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

          /*this.service1.getDevice(this.dd).subscribe((res: any) => {
            this.objectDevice=res;
            console.log(this.objectDevice)
            console.log(res)
          
          if(this.type == 1){
           this.body = {  
            "serial": this.dd,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "scanner":this.objectDevice.scanner,
            "photocopiers":this.objectDevice.photocopiers,
            "printers":this.objectDevice.printers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "fax":this.objectDevice.fax,
            "other":this.objectDevice.other,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            "numberofdevices":this.devicesListLength,
          
          }
          }else if(this.type == 2){
            this.body = {
              "serial": this.dd,
              "printers":this.devicesListLength,
              "numberofdevices":this.objectDevice.numberofdevices,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "scanner":this.objectDevice.scanner,
            "photocopiers":this.objectDevice.photocopiers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "fax":this.objectDevice.fax,
            "other":this.objectDevice.other,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            }
          } else if(this.type == 3){
            this.body = {
              "serial": this.dd,
              "photocopiers":this.devicesListLength,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "scanner":this.objectDevice.scanner,
            "printers":this.objectDevice.printers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "fax":this.objectDevice.fax,
            "other":this.objectDevice.other,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            "numberofdevices":this.objectDevice.numberofdevices,
            }
          } else if(this.type == 4){
            this.body = {
              "serial": this.dd,
              "scanner":this.devicesListLength,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "photocopiers":this.objectDevice.photocopiers,
            "printers":this.objectDevice.printers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "fax":this.objectDevice.fax,
            "other":this.objectDevice.other,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            "numberofdevices":this.objectDevice.numberofdevices,
            }
          } else if(this.type == 5){
            this.body = {
              "serial": this.dd,
              "fax":this.devicesListLength,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "scanner":this.objectDevice.scanner,
            "photocopiers":this.objectDevice.photocopiers,
            "printers":this.objectDevice.printers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "other":this.objectDevice.other,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            "numberofdevices":this.objectDevice.numberofdevices,
            }
          }else if(this.type == 7){
            this.body = {
              "serial": this.dd,
              "other":this.devicesListLength,
            "Notes":this.objectDevice.Notes,
            "devicesthatneedmaintenance":this.objectDevice.devicesthatneedmaintenance,
            "scanner":this.objectDevice.scanner,
            "photocopiers":this.objectDevice.photocopiers,
            "printers":this.objectDevice.printers,
            "CustomsArea":this.objectDevice.CustomsArea,
            "affiliatemanagement":this.objectDevice.affiliatemanagement,
            "publicadministration":this.objectDevice.publicadministration,
            "centraldepartments":this.objectDevice.centraldepartments,
            "sector":this.objectDevice.sector,
            "fax":this.objectDevice.fax,
            "username":this.objectDevice.username,
            "usereditor":this.objectDevice.usereditor,
            "note":this.objectDevice.note,
            "insertdate":this.objectDevice.insertdate,
            "IDRelation":this.objectDevice.IDRelation,
            "Structure":this.objectDevice.Structure,
            "needs":this.objectDevice.needs,
            "needsOrderDate":this.objectDevice.needsOrderDate,
            "ForOrder":this.objectDevice.ForOrder,
            "numberofdevices":this.objectDevice.numberofdevices,
            }
          }
          this.service1.UpdateDevice(this.dd, this.body).subscribe(res => {
            
            //this.notificationService.success('تم التعديل بنجاح');
          });
          });*/




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
    return this.userForm.controls;
  }

}
