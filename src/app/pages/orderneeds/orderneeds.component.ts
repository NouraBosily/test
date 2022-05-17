import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { NotificationService } from '../../shared/notification.service';
import { Devices3Service } from '../../shared/devices3.service';
import { DevicesService } from '../../shared/devices.service';
import { OrderNeedsService } from '../../shared/orderneeds.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'ngx-orderneeds',
  templateUrl: './orderneeds.component.html',
  styleUrls: ['./orderneeds.component.scss']
})
export class OrderneedsComponent implements OnInit {

  serial;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  type;
  code;
  orderID;
  name;
  disableFlag;
  devicesListLength;
  constructor(private fb: FormBuilder,
    private service: OrderNeedsService,
    private deviceService: DevicesService,
    private dialog: MatDialog,
    private route1: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,

    private notificationService: NotificationService
  ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["Structure","OrderDate", "Done", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {

    this.call();
  }

  call(){
    this.serial = this.route.snapshot.paramMap.get('serial');
    this.code = this.route.snapshot.paramMap.get('code');

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
    console.log(this.serial)
    console.log(this.type)
    this.getAllOrderNeeds();
  }
  getAllOrderNeeds() {
    this.service.getAllOrderNeeds(this.serial).subscribe((res: any) => {
      //this.devicesListLength = res.length;
      //this.name=res[0].Structure
      //console.log(this.devicesListLength)

      console.log(res)
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(id,DeviceId) {
    console.log(id);
    //create-orderneeds/edit/:orderId/:deviceid/:code/:orderDetailsId
    this.route1.navigate(['/pages/create-orderneeds/edit/' + id +'/'+DeviceId+'/'+this.code]);
  }

  onCreate() {
    /*console.log(this.code)

    this.route1.navigate(['/pages/devicechild/add/' + this.serial + "/" + this.code + '/' + this.type]);
    console.log(this.code)*/

    
//orderneeds-details/:id/:deviceid
this.route1.navigate(['/pages/create-orderneeds/add/' + this.serial +'/'+this.code]);

  }
  onDelete( id) {

    if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
      this.service.deleteOrder(this.serial, id).subscribe(res => {
        this.notificationService.success('تم الحذف بنجاح');
        this.getAllOrderNeeds();
        //this.call();
      });
    }

  }

  goToAllDevices(){
    this.route1.navigate(['/pages/devicesmangsform/edit/'+this.serial+'/'+this.code]);

  }

}
