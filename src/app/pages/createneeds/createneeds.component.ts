import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UsersService } from '../../shared/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { Devices3ChildService } from '../../shared/devices3child.service';
import { Mark } from '../model/Mark';
import { Devices3Service } from '../../shared/devices3.service';
import { OrderNeedsItem } from '../model/OrderNeedsItem';
import { OrderNeedsService } from '../../shared/orderneeds.service';
import { CreateneedsDetailsComponent } from '../createneeds-details/createneeds-details.component';
import { MarksService } from '../../shared/marks.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
@Component({
  selector: 'ngx-createneeds',
  templateUrl: './createneeds.component.html',
  styleUrls: ['./createneeds.component.scss']
})
export class CreateneedsComponent implements OnInit {
  deviceid;
  id;
  submitted: boolean = false;
  needsForm: FormGroup;
  checked = false;
  type;
  code;
  orderID;
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
  serial;
  orderItems: OrderNeedsItem[];
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    { id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    { id: 4, name: 'لا يعمل قديم' }]

  constructor(private activeRoute: ActivatedRoute,
    public service: OrderNeedsService,
    public servicedevices3: Devices3Service,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public marksService: MarksService,
    private route1: Router,
    private _adapter: DateAdapter<any>,
    private notificationService: NotificationService,
  ) { }
  displayedColumns: string[] = ["Type", "Mark", "DeviceModel", "NumberOf", "actions"];
  OrderNeedsItem: OrderNeedsItem;
  IDs = "";

  InitializeLogin() {
    this.service.needsForm = this.fb.group({
      ID: ["0", Validators.required],
      DeviceId: ["0", Validators.required],
      Done: [""],
      OrderDate: [""],
      DeletedOrderItemIDs: [""]
    })
    this.service.orderItems = [];
  }

flag;

  ngOnInit() {
    console.log(this.IDs)
this.IDs="";
    this.serial = this.route.snapshot.paramMap.get('deviceid');
    this.code = this.route.snapshot.paramMap.get('code');

    this.orderID = this.route.snapshot.paramMap.get('orderId');
    this._adapter.setLocale('ar');
    //this.flag=true;
    console.log(this.flag)
    this.marksService.getAllMarks().subscribe((res: Mark[]) => {
      this.MarksArray = res;
    })
    console.log(this.orderID)
    if (this.orderID == null) {
      this.InitializeLogin();
      this.service.needsForm.controls["DeviceId"].setValue(this.serial);
      console.log(this.service.needsForm.value)
    } else {
      this.service.GetOrderNeedsById(this.orderID).subscribe((res: any) => {
        //this.flag=true
        console.log(this.flag)
this.flag=res;
        this.service.orderItems = res.orderDetails;
        console.log(res.orderDetails)
        console.log(this.service.orderItems.length)
        console.log(this.service.orderItems)
        console.log(this.service.orderItems)
        if (res.order.Done == 1) {
          this.checked = true
        } else if (res.order.Done == 0) {
          this.checked = false;
        }
        this.service.needsForm.patchValue({
          ID: res.order.ID,
          OrderDate: res.order.OrderDate,
          DeviceId: res.order.DeviceId
        });
      })
    }

  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    //this.flag=false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(CreateneedsDetailsComponent, dialogConfig).afterClosed().subscribe(res => {
    });
    
    console.log(this.flag)

  }

  AchievementEdit(OrderID, Type) {
    this.route1.navigate(['/pages/achievments/' + OrderID + '/' + this.serial + '/' + this.code + '/' + this.orderID + '/' + Type]);

  }

  onSubmit() {
    console.log(this.service.needsForm.value)

    if (this.service.needsForm.valid) {
      console.log("this.needsForm.value")
      console.log(this.service.needsForm.value)
      console.log(this.service.needsForm.controls["Done"].value)
      if (this.service.needsForm.controls["Done"].value == true) {
        this.service.needsForm.patchValue({
          Done: 1
        })
      } else {
        this.service.needsForm.patchValue({
          Done: 0
        })
      }
      this.service.saveOrUpdateOrder(this.serial, this.service.needsForm.value).subscribe((res: any) => {
        console.log(this.IDs)
        //this.IDs="";

        this.notificationService.success('تم الحفظ بنجاح');
        if (this.orderID == null) {
          console.log(this.IDs)
          this.service.needsForm.controls["DeletedOrderItemIDs"].setValue("");

          this.route1.navigate(['/pages/create-orderneeds/edit/' + res.id + '/' + this.serial + '/' + this.code]);
          console.log('--------------------')

        } else {
          this.ngOnInit();
          console.log(this.IDs)
          this.route1.navigate(['/pages/create-orderneeds/edit/' + this.orderID + '/' + this.serial + '/' + this.code]);
          console.log( this.orderID + this.serial  + this.code)
          this.service.needsForm.controls["DeletedOrderItemIDs"].setValue("");

console.log('++++++++++++++++++++')
        }
        console.log(this.IDs)

      })
      console.log(this.IDs)

    } else {
      console.log('invalid')
      console.log(this.service.needsForm.value)

      console.log(this.service.needsForm.value);
      return;
    }
  }

  isValid;
  validateForm() {
    this.isValid = true;
    if (this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  showOrdersByDeviceId() {
    this.route1.navigate(['/pages/orderneeds/' + this.serial + '/' + this.code]);
  }
  french() {
    this._adapter.setLocale('ar');
  }

  onDeleteOrderItem(orderItemID: number, i: number) {
    //this.IDs="";
    console.log(orderItemID + '         ' + i)
    if (orderItemID != null)
      this.IDs += orderItemID + ",";
    console.log(this.IDs)
    this.service.needsForm.controls["DeletedOrderItemIDs"].setValue(this.IDs);
    console.log(this.service.needsForm.controls["DeletedOrderItemIDs"].value)
    //+= orderItemID + ",";
    this.service.orderItems.splice(i, 1);
    console.log(this.service.orderItems)
  }
  goToAllDevices(){
    this.route1.navigate(['/pages/devicesmangsform/edit/'+this.serial+'/'+this.code]);

  }
}
