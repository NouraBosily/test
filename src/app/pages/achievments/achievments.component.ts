import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { NotificationService } from '../../shared/notification.service';
import { Devices3Service } from '../../shared/devices3.service';
import { DevicesService } from '../../shared/devices.service';
import { OrderNeedsService } from '../../shared/orderneeds.service';
import { AchievmentService } from '../../shared/achievment.service';
import { DatePipe } from '@angular/common'

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'ngx-achievments',
  templateUrl: './achievments.component.html',
  styleUrls: ['./achievments.component.scss']
})
export class AchievmentsComponent implements OnInit {

  serial;
  orderId;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  type;
  code;
  orderID;
  name;
  disableFlag;
  devicesListLength;
  orderNeedsId;
  constructor(private fb: FormBuilder,
    private service: AchievmentService,
    private deviceService: DevicesService,
    private dialog: MatDialog,
    private route1: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private _adapter: DateAdapter<any>,
    private notificationService: NotificationService
  ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["AchievementDeviceType","AchievementCase", "AchievementDeviceModel","Mark","NumberOf", "devicedate","actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {

    this.call();
  }

  call(){
    this.orderId = this.route.snapshot.paramMap.get('orderId');
this.serial= this.route.snapshot.paramMap.get('serial');
this.code= this.route.snapshot.paramMap.get('code');
this.orderNeedsId= this.route.snapshot.paramMap.get('orderNeedsId');
this.type= this.route.snapshot.paramMap.get('type');
this._adapter.setLocale('ar');

//console.log(new Date().toLocaleString())
    //this.code = this.route.snapshot.paramMap.get('code');

   /* this.service.getDevices3List(this.serial, this.type).subscribe((res: any[]) => {
      this.devicesListLength = res.length;
    })
    this.service.getAdministrationName(this.code).subscribe((res: any) => {
      this.name = res.name;
      console.log(res)
    });*/
    /*this.service.GetDevices3Structure(this.serial).subscribe((res:any) =>{
//this.name=res.Structure;
console.log(this.name)
    });*/
    /*this.service.getAdministrationName(this.code).subscribe((res: any) => {
      this.name = res.name;
      console.log(res)
    });*/
    console.log(this.orderId)
    this.getAchievments();
  }
  
  getAchievments() {
    this.service.getAchievmentsForOrderDetailsID(this.orderId).subscribe((res: any) => {
      //this.devicesListLength = res.length;
      //this.name=res[0].Structure
      //console.log(this.devicesListLength)

      console.log(res)
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(Id,OrderDetailsID) {
    console.log(Id);
    ///:serial/:code/:orderNeedsId
    this.route1.navigate(['/pages/achievments-child/edit/' + Id +'/'+OrderDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type]);
  }

  onCreate() {
    /*console.log(this.code)

    this.route1.navigate(['/pages/devicechild/add/' + this.serial + "/" + this.code + '/' + this.type]);
    console.log(this.code)*/

//orderneeds-details/:id/:deviceid-----------/:serial/:code/:orderNeedsId
this.route1.navigate(['/pages/achievments-child/add/' + this.orderId+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type]);

  }
  onDelete( id) {

    if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
      this.service.deleteAchievment(id,this.serial).subscribe(res => {
        this.notificationService.success('تم الحذف بنجاح');
        this.getAchievments();
        //this.call();
      });
    }

  }

  goToAllNeeds(){
    //create-orderneeds/edit/:orderId/:deviceid/:code
    this.route1.navigate(['/pages/create-orderneeds/edit/'+this.orderNeedsId+'/'+this.serial+'/'+this.code]);

  }

}
