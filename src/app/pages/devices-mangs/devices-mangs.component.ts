import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { DevicesService } from '../../shared/devices.service';

@Component({
  selector: 'ngx-devices-mangs',
  templateUrl: './devices-mangs.component.html',
  styleUrls: ['./devices-mangs.component.scss']
})
export class DevicesMangsComponent implements OnInit {

  id;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  deviceForm: FormGroup;
  sectorID;
  centerID;
  ManagmentID;
  Managment1ID;
  Managment2ID;

  centersList;
  ManagmentsList;
  Managments1List;
  Managments2List;
  constructor(private fb: FormBuilder,
    private service: DevicesService,
    private dialog: MatDialog,
    private route1: Router,
    private route:Router,
  private notificationService: NotificationService
    ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["name", "CustomsArea","numberofdevices","printers","photocopiers","actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
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

  ngOnInit() {
   
    //this.dbid = this.route.snapshot.paramMap.get('DDBIdentification');
    //this.ExportPermitIsn = this.route.snapshot.paramMap.get('ExportPermitIsn');
    //this.LoadingPORTIsn = this.route.snapshot.paramMap.get('LoadingPortIsn');
    //console.log('-----------')
    //console.log(this.ExportPermitIsn);
    //this.InitializeForm();
    this.getAllDevices();
  }

  InitializeForm() {

      this.deviceForm = this.fb.group({
        SectionId: ["0", Validators.required],
        Centers: ["0"],
        Managment: ["0"],
        Managment1: ["0"],        
        Managment2: ["0"],
        CustomsArea: ["", Validators.required],
        username: ["", Validators.required],
        usereditor: ["", Validators.required],
        name: [""],
        affiliatemanagement: [""],
        numberofdevices: ["0"],
        printers: ["0"],
        insertdate: new Date(),
        photocopiers: ["0"],
        scanner: ["0"],
        fax: ["0"],
        other: ["0"],
        Notes: [""],
      })
    
  }
  getAllDevices() {
    this.service.getAllDevices().subscribe((res: any) => {
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(id,code) {
    console.log(id);
    this.route1.navigate(["/pages/devicesmangsform/edit/"+id+"/"+code]);
  }

  onCreate() {
    this.route1.navigate(['/pages/devicesmangsform/add/']);
  }
  onDelete(id) {
    if (id > 0 ) {
      if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
        console.log(id)
        //this.service.deleteDevice(id).subscribe(res => {

          this.service.deleteDevices3ForDevices(id).subscribe(res1 => {
            this.notificationService.success('تم الحذف بنجاح');
            this.getAllDevices();
          })
          
          
        //});
      }
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  showComputers(serial,type,code){
    this.route.navigateByUrl('/pages/computers/'+serial+"/"+type+"/"+code);
    
  }

  showSections() {
    if (this.RadioValue == 2) {
      return 'hidden-row';
    }
    else {
      return null;
    }
  }
  onchangeSections(ctrl) {
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getCenters1(ctrl.id).subscribe((res: any) => {
        this.sectorID=ctrl.id;
        console.log(this.sectorID)
        this.centersList=res;
        console.log(this.centersList)
  
      });
      

    }

  }

  showSectorDevices(id){

    console.log(id)
    this.service.getDevice1(id).subscribe((res: any) => {
      //this.sectorID=ctrl.id;
      //console.log(this.sectorID)
      console.log(res);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }

  showCenterDevices(id){

    console.log(id)
    this.service.getDevice1(id).subscribe((res: any) => {
      //this.sectorID=ctrl.id;
      //console.log(this.sectorID)
      console.log(res);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }

  showManagmentDevices(ManagmentID){
    console.log(ManagmentID)
    this.service.getDevice1(ManagmentID).subscribe((res: any) => {
      //this.sectorID=ctrl.id;
      //console.log(this.sectorID)
      console.log(res);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }

  onchangeCenters(ctrl){
    this.ManagmentsList=null;
    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments(ctrl).subscribe((res: any) => {
        this.centerID=ctrl;
        console.log(this.centerID)
        this.ManagmentsList=res;
        console.log(this.ManagmentsList)  
      });     
    }
  }

  onchangeManagments(ctrl){
    this.Managments1List=null;

    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments1(ctrl).subscribe((res: any) => {
        this.ManagmentID=ctrl;
        console.log(this.ManagmentID)
        this.Managments1List=res;
        console.log(this.Managments1List)  
      });     
    }
  }

  onchangeManagments1(ctrl){
    this.Managments2List=null;

    console.log(ctrl)
    if (typeof (ctrl) === "undefined") {
      return
    }
    else {
      this.service.getMangments2(ctrl).subscribe((res: any) => {
        this.Managment1ID=ctrl;
        console.log(this.Managment1ID)
        this.Managments2List=res;
        console.log(this.Managments2List)  
      });     
    }
  }

  onchangemanagments2(ctrl){
        this.Managment2ID=ctrl;
        
  }


}
