import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { NotificationService } from '../../shared/notification.service';
import { Devices3Service } from '../../shared/devices3.service';
import { DevicesService } from '../../shared/devices.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'ngx-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {
  serial;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  type;
  code;
  name;
  disableFlag;
  devicesListNumberOfCases;
  constructor(private fb: FormBuilder,
    private service: Devices3Service,
    private deviceService: DevicesService,
    private dialog: MatDialog,
    private route1: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,

    private notificationService: NotificationService
  ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["devicemark", "printercase","devicedate", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {

    this.call();
  }

  call(){
    this.serial = this.route.snapshot.paramMap.get('serial');
    this.type = this.route.snapshot.paramMap.get('type');
    this.code = this.route.snapshot.paramMap.get('code');
    this.service.GetDevices3Count(this.serial, this.type).subscribe((res: any) => {
      console.log(res)
      if(res.sums.length >0){
      this.devicesListNumberOfCases = res.sums;
      console.log(this.devicesListNumberOfCases);

      console.log(this.disableFlag)
      }else{
        this.devicesListNumberOfCases = 0;

      }
     
    });
    // get count of devices3
    /* this.service.GetDevices3Count(this.serial, this.type).subscribe((res: any) => {
      if(res.sums.length >0){
      this.devicesListLength = res.sums[0].numberofdevices;
      console.log(this.devicesListLength)
      console.log("this.devicesListLength)");
      }else{
        this.devicesListLength = 0;
      }     
    }); */

    // get devices3 list details already inserted
    this.service.getDevices3List(this.serial, this.type).subscribe((res: any) => {
      console.log(res)
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });

    // get device count from devices
    this.deviceService.getDevice(this.serial).subscribe((res: any) => {
      if (this.type == 1) {
        this.disableFlag = res.numberofdevices;

      }else if(this.type == 2){
        this.disableFlag = res.printers;

      }else if(this.type == 3){
        this.disableFlag = res.photocopiers;

      }else if(this.type == 4){
        this.disableFlag = res.scanner;

      }else if(this.type == 5){
        this.disableFlag = res.fax;
      }else if(this.type == 7){
        this.disableFlag = res.other;
      }
    });
   
    this.service.getAdministrationName(this.code).subscribe((res: any) => {
      this.name = res.name;
      console.log(res)
    });
    console.log(this.serial)
    console.log(this.type)
    //this.getAllDevices();    
  }
  getAllDevices() {
    // get device count from devices
    this.deviceService.getDevice(this.serial).subscribe((res: any) => {
      if (this.type == 1) {
        this.disableFlag = res.numberofdevices;

      }else if(this.type == 2){
        this.disableFlag = res.printers;

      }else if(this.type == 3){
        this.disableFlag = res.photocopiers;

      }else if(this.type == 4){
        this.disableFlag = res.scanner;

      }else if(this.type == 5){
        this.disableFlag = res.fax;
      }else if(this.type == 7){
        this.disableFlag = res.other;
      }
    });

    /* this.service.GetDevices3Count(this.serial, this.type).subscribe((res: any) => {
      if(res.length >0){
      this.devicesListLength = res[0].numberofdevices;
      console.log(this.disableFlag)
      }else{
        this.devicesListLength = 0;

      }
     
    }); */
    this.service.getDevices3List(this.serial, this.type).subscribe((res: any) => {
      //this.devicesListLength = res.length;
      //this.name=res[0].Structure
      //console.log(this.devicesListLength)

      console.log(res)
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(id) {
    console.log(id);
    this.route1.navigate(["/pages/devicechild/edit/" + id + "/" + this.code + "/" + this.type]);
  }

  onCreate() {
    console.log(this.code)

    this.route1.navigate(['/pages/devicechild/add/' + this.serial + "/" + this.code + '/' + this.type]);
    console.log(this.code)

  }
  onDelete(id) {

    if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
      this.service.deleteDevice(id).subscribe(res => {
        this.notificationService.success('تم الحذف بنجاح');
        //this.getAllDevices();
        this.call();
      });
    }

  }

  goToAllDevices(){
    this.route1.navigate(['/pages/devicesmangsform/edit/'+this.serial+'/'+this.code]);

  }

}
