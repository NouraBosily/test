import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'ngx-makrs',
  templateUrl: './makrs.component.html',
  styleUrls: ['./makrs.component.scss']
})
export class MakrsComponent implements OnInit {
  id;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  constructor(private fb: FormBuilder,
    private service: MarksService,
    private dialog: MatDialog,
    private route1: Router,
    private route: ActivatedRoute,

  private notificationService: NotificationService
    ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ "devicemark","devicecategory","actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
   
    //this.dbid = this.route.snapshot.paramMap.get('DDBIdentification');
    //this.ExportPermitIsn = this.route.snapshot.paramMap.get('ExportPermitIsn');
    //this.LoadingPORTIsn = this.route.snapshot.paramMap.get('LoadingPortIsn');
    //console.log('-----------')
    //console.log(this.ExportPermitIsn);
    this.getAllMarks();
  }

  getAllMarks() {
    this.service.getAllMarks().subscribe((res: any) => {
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(id) {
    console.log(id);
    this.route1.navigate(["/pages/markform/edit/" + id ]);
  }

  onCreate() {
    this.route1.navigate(['/pages/markform/add/']);
  }
  onDelete(id) {
    if (id > 0 ) {
      if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
        this.service.deleteMark(id).subscribe(res => {
          this.notificationService.success('تم الحذف بنجاح');
          this.getAllMarks();
        });
      }
    }
  }
  goToAllDevices(){
    this.route1.navigate(['/pages/availabldevicesmangs']);

  }

}
