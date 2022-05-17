import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UsersService } from '../../shared/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { DepartmentsComponent } from '../departments/departments.component';
import { ComputersComponent } from '../computers/computers.component';
import { DevicesService } from '../../shared/devices.service';
@Component({
  selector: 'ngx-test',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {
  sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ]
  RadioValue = 1;
  code;
  OrderNeedsCount: any;
  deviceObject: any;
  insertedBefore: boolean = false;
  serial: any;
  cod: any;
  isReadonly: boolean;
  constructor(private activeRoute: ActivatedRoute,
    public service: DevicesService,
    private dialog: MatDialog,
    private route: Router,
    private fb: FormBuilder,
    private userService: UsersService,
    private notificationService: NotificationService,
  ) { }
  id;
  submitted: boolean = false;
  deviceForm: FormGroup;
  user;
  areasArray = [
    { id: 1, name: 'شمالية و غربية' },
    { id: 2, name: 'وسطى و جنوبية' },
    { id: 3, name: 'شرقية' }


  ];
  InitializeLogin() {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

    this.userService.getUserName(payload.UserID).subscribe((res: any) => {

      this.user = { "name": res.name }
      this.deviceForm = this.fb.group({
        serial: ["0", Validators.required],
        IDRelation: ["0", Validators.required],
        SectionId: ["0", Validators.required],
        CustomsArea: ["", Validators.required],
        username: [this.user.name],
        usereditor: [this.user.name, Validators.required],
        affiliatemanagement: [""],
        numberofdevices: [null],
        printers: [null],
        insertdate: new Date(),
        photocopiers: [null],
        scanner: [null],
        fax: [null],
        other: [null],
        Notes: [""],
        Structure: ["", Validators.required],
        needs: [null],
        needsOrderDate: [""],
        ForOrder: [false]

      })
    });
  }
  secid;
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    console.log(this.id)
    this.InitializeLogin();
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.isReadonly = true;

      this.InitializeLogin();

    } else {
      this.isReadonly = true;
      let id = this.activeRoute.snapshot.paramMap.get("id");
      console.log(id)
      this.code = this.activeRoute.snapshot.paramMap.get("code");

      this.service.getDevice(parseInt(this.id)).subscribe((res: any) => {

        this.deviceObject = res.deviceDetails;
        console.log(this.deviceObject)

        this.service.GetdevicesNeedsDatesByID(parseInt(this.id)).subscribe((result: any) => {
          this.OrderNeedsCount = result.length;
          console.log(this.OrderNeedsCount)

        });

        console.log(res.deviceDetails.CustomsArea)
        if (res.deviceDetails.affiliatemanagement.length == 9) {
          this.secid = parseInt(res.deviceDetails.affiliatemanagement.substring(0, 1));

        } else if (res.deviceDetails.affiliatemanagement.length == 10) {
          this.secid = parseInt(res.deviceDetails.affiliatemanagement.substring(0, 2));
        }

        console.log(this.secid)
        console.log(this.sections[this.secid - 1])
        console.log(this.secid)
        console.log(res.deviceDetails.name)

        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

        this.userService.getUserName(payload.UserID).subscribe((result: any) => {
          let devices=0, printers=0, photocopiers=0, scanner=0, fax=0, other=0;
          for (var i in res.sums) {
            if (res.sums[i].model == 1) {
              devices = res.sums[i].numberofdevices;
            } if (res.sums[i].model == 2) {
              printers = res.sums[i].numberofdevices;
            } if (res.sums[i].model == 3) {
              photocopiers = res.sums[i].numberofdevices;
            } if (res.sums[i].model == 4) {
              scanner = res.sums[i].numberofdevices;
            } if (res.sums[i].model == 5) {
              fax = res.sums[i].numberofdevices;
            } if (res.sums[i].model == 7) {
              other = res.sums[i].numberofdevices;
            }
          }

          this.user = { "name": result.name }
          this.deviceForm.setValue({
            serial: res.deviceDetails.serial,
            SectionId: this.sections[this.secid - 1].id,
            CustomsArea: parseInt(res.deviceDetails.CustomsArea),
            username: res.deviceDetails.username,
            usereditor: this.user.name,
            //name: res.name,
            affiliatemanagement: res.deviceDetails.affiliatemanagement,
            numberofdevices: devices,
            printers: printers,
            insertdate: res.deviceDetails.insertdate,
            photocopiers: photocopiers,
            scanner: scanner,
            fax: fax,
            other: other,
            Notes: res.deviceDetails.Notes,
            needs: res.deviceDetails.needs,
            needsOrderDate: res.deviceDetails.needsOrderDate,
            Structure: res.deviceDetails.Structure,
            IDRelation: res.deviceDetails.IDRelation,
            ForOrder: res.deviceDetails.ForOrder

          });
        }
        );


        console.log(this.deviceForm.value)
      });
    }
  }


  onSubmit() {
    var body = {
      "cod": this.deviceForm.controls["affiliatemanagement"].value
    }
    this.submitted = true;
    console.log(this.deviceForm.value);

    if (this.deviceForm.invalid) {
      console.log(this.deviceForm.value);
      return;
    }

    else {
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.deviceForm.value)
        this.service.insertDevice(this.deviceForm.value).subscribe((res: any) => {
          this.notificationService.success('تم الإدراج بنجاح');
          console.log(this.deviceObject);
          this.route.navigate(["/pages/devicesmangsform/edit/" + res.serial + "/" + res.affiliatemanagement]);
          console.log(this.deviceObject);
        },
          err => {
            if (err.status == 400) {
              alert('تم ادراج هذه هذه الإدارة من قبل');
            }

            else {
              console.log(err);
            }
          });
      } else {
        console.log('sjhdjjsh')
        console.log('this.id ' + this.id)
        console.log('this.deviceForm.value ')
        console.log(this.deviceForm.value)

        this.service.UpdateDevice(this.id, this.deviceForm.value).subscribe(res => {
          /*this.service.PutDevices3List(this.id, body).subscribe(res => {
            console.log(res)
          })*/

          this.notificationService.success('تم التعديل بنجاح');
        });
      }
    }
  }

  onchangeSections(ctrl) {
    let space = 3;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { space }
    this.dialog.open(DepartmentsComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      else {
        console.log(result)
        console.log("result.affiliatemanagement " + result.cod)
        console.log("result.IDRelation " + result.ID)


        //this.deviceForm.controls["name"].setValue(result.name1 + " / " + result.name);
        this.deviceForm.controls["affiliatemanagement"].setValue(result.cod);
        this.deviceForm.controls["IDRelation"].setValue(result.ID);
        this.deviceForm.controls["Structure"].setValue(result.Structure);

        this.service.CheckIfDeviseInserted(result.cod).subscribe((res: any) => {
          /*this.service.PutDevices3List(this.id, body).subscribe(res => {
            console.log(res)
          })*/
          console.log(this.insertedBefore)

          this.serial = res.serial;
          this.cod = res.affiliatemanagement;
          if (res != null) {
            if (confirm('تم ادراج هذه الادارة من قبل هل تريد عرض بياناتها؟')) {
              this.route.navigate(["/pages/devicesmangsform/edit/" + this.serial + "/" + this.cod]);
            }
          }
        });

        console.log(result)
      }
    })

    //}

  }


  onChooseComputer() {
    /*if (typeof (ctrl) === "undefined") {
      return
    }
    else {*/

    // let SectionId = ctrl.sec;
    //let space = 3;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    //dialogConfig.data = { SectionId ,space}
    this.dialog.open(ComputersComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      else {
        this.deviceForm.controls["name"].setValue(result.name1 + " / " + result.name);
        this.deviceForm.controls["cod"].setValue(result.cod);
        this.deviceForm.controls["sec"].setValue(result.sec);
        this.deviceForm.controls["mang"].setValue(result.mang);
        this.deviceForm.controls["mang1"].setValue(result.mang1);
        this.deviceForm.controls["mang2"].setValue(result.mang2);
        this.deviceForm.controls["space"].setValue(result.space);

        console.log(result)
      }
    })

    //}

  }


  showSections() {
    if (this.RadioValue == 2) {
      return 'hidden-row';
    }
    else {
      return null;
    }
  }
  get f() {
    return this.deviceForm.controls;
  }

  showOrderNeeds(serial) {
    this.route.navigateByUrl('/pages/orderneeds/' + serial + '/' + this.code);

  }

  showComputers(id, type) {//computers/:serial/:type/:code
    console.log(this.deviceObject);


    /*if (this.deviceObject.CustomsArea != this.deviceForm.controls["CustomsArea"].value
      || this.deviceObject.username != this.deviceForm.controls["username"].value
      || this.deviceObject.usereditor != this.deviceForm.controls["usereditor"].value
      || this.deviceObject.affiliatemanagement != this.deviceForm.controls["affiliatemanagement"].value
      || this.deviceObject.numberofdevices != this.deviceForm.controls["numberofdevices"].value
      || this.deviceObject.printers != this.deviceForm.controls["printers"].value
      || this.deviceObject.photocopiers != this.deviceForm.controls["photocopiers"].value
      || this.deviceObject.scanner != this.deviceForm.controls["scanner"].value
      || this.deviceObject.fax != this.deviceForm.controls["fax"].value
      || this.deviceObject.other != this.deviceForm.controls["other"].value
      || this.deviceObject.Notes != this.deviceForm.controls["Notes"].value
      || this.deviceObject.Structure != this.deviceForm.controls["Structure"].value
      || this.deviceObject.ForOrder != this.deviceForm.controls["ForOrder"].value
      || this.deviceObject.IDRelation != this.deviceForm.controls["IDRelation"].value

    ) {

      if (confirm('this.deviceObject.CustomsArea '+this.deviceForm.controls["CustomsArea"].value+
       'this.deviceObject.username '+ this.deviceForm.controls["username"].value+
      'this.deviceObject.usereditor'+ this.deviceForm.controls["usereditor"].value+
    'this.deviceObject.affiliatemanagement'+ this.deviceForm.controls["affiliatemanagement"].value+
      'this.deviceObject.numberofdevices '+ this.deviceForm.controls["numberofdevices"].value+
      'this.deviceObject.printers'+ this.deviceForm.controls["printers"].value+
      'this.deviceObject.photocopiers '+ this.deviceForm.controls["photocopiers"].value+
      ' this.deviceObject.scanner'+ this.deviceForm.controls["scanner"].value+
      'this.deviceObject.fax '+this.deviceForm.controls["fax"].value+
      'this.deviceObject.other '+ this.deviceForm.controls["other"].value+
      'this.deviceObject.Notes '+this.deviceForm.controls["Notes"].value+
      'this.deviceObject.Structure '+ this.deviceForm.controls["Structure"].value+
      'this.deviceObject.ForOrder'+ this.deviceForm.controls["ForOrder"].value+
      'this.deviceObject.IDRelation'+ this.deviceForm.controls["IDRelation"].value+ '<br> تنبيه : لم تقم بحفظ البيانات هل ستقوم بالخروج من هذه الشاشة')) {
        this.route.navigateByUrl('/pages/computers/' + id + '/' + type + '/' + this.code);
      }
    }else{*/
    this.route.navigateByUrl('/pages/computers/' + id + '/' + type + '/' + this.code);
    //}

  }

  goToAllDevices() {
    this.route.navigate(['/pages/availabldevicesmangs']);

  }
}
