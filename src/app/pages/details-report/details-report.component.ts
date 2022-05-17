import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { ReportsService } from '../../shared/reports.service';

@Component({
  selector: 'ngx-details-report',
  templateUrl: './details-report.component.html',
  styleUrls: ['./details-report.component.scss']
})
export class DetailsReportComponent implements OnInit {

  centID: any;
  MangmetsID: any;
  Mangmets1ID: any;
  Mangmets2ID: any;
  constructor(public service: ReportsService, public dialogRef: MatDialogRef<DetailsReportComponent>
    , @Inject(MAT_DIALOG_DATA) public data) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ["Structure", "markName", "devicemodel","numberofprinter","devicedate"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  sec;
  cent;
  mang;
  mang1;
  mang2;
  order;

  ngOnInit() {
    console.log("jskjskjk")
    if (this.data.deviceid > 0) {
      console.log(this.data.deviceid)
      this.Getdevices3ReportDetailsItem();
    }

  }
  Getdevices3ReportDetailsItem(){
    this.service.Getdevices3ReportDetailsItem(this.data.deviceid, this.data.model,this.data.printercase).subscribe((res: any) => {
      console.log(res)
      console.log(res[0])
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {

        return this.displayedColumns.some(ele => {
          if (typeof data[ele] === "string") {
            return data[ele].toLowerCase().indexOf(filter) != -1;
          }
        });
      };
    });
  }

  onClose() {
    this.dialogRef.close();
    //this..controls["SectionId"].setValue("");

  }

}
