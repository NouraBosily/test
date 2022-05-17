import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { DepartmentService } from '../../shared/department.service';
import { DepartmentsService } from '../../shared/departments.service';

@Component({
  selector: 'ngx-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  centID: any;
  MangmetsID: any;
  Mangmets1ID: any;
  Mangmets2ID: any;
  constructor(private service: DepartmentsService, public dialogRef: MatDialogRef<DepartmentsComponent>
    , @Inject(MAT_DIALOG_DATA) public data) { }

  listData: MatTableDataSource<any>;
  listDataForsearch: MatTableDataSource<any>;

  displayedColumns: string[] = ["name", "cod", "actions"];
  displayedColumnsForSearch: string[] = ["structure", "cod", "actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sortForSearch: MatSort;

 // @ViewChild('paginator', {static: true}) paginator: MatPaginator;

//  @ViewChild('paginator', {static: true}) paginator: MatPaginator;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //@ViewChild(MatPaginator, { static: true }) paginatorForSearch: MatPaginator;

  searchKey: string;
  sec;
  cent;
  mang;
  mang1;
  mang2;
  order;


  /*public handlePageBottom(event: PageEvent) {
    console.log(event);
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
}*/
refreshPaginator() {
  //if (this.listDataForsearch.paginator == null) {
    if (this.listDataForsearch.paginator == null) {
    console.log("kkkkkkkkkkkkk")
    this.listData.paginator = this.paginator;
  }
  if (this.listData.paginator == null) {
    console.log("uuuuuuuuuuuuuuuuuu")

    this.listDataForsearch.paginator = this.paginator;
  }
  let pageIndex = 0;

  setTimeout((idx) => {
    this.paginator.pageIndex = idx;
    this.paginator._changePageSize(this.paginator.pageSize);
  }, 0, pageIndex);
}

  ngOnInit() {
    this.flag=0;
    //this.listData=null;
    //this.listDataForsearch=null;
    //if (this.data.SectionId > 0) {
      //console.log(this.data.space)
      //this.getCenters(this.data.SectionId, this.data.space);
      this.getSectors();
    //}

  }


  follow;
  getSectors() {
    this.listDataForsearch=null;
    this.service.getSectors1().subscribe((res: any) => {
      
      this.follow = res;
      console.log(this.follow)
      console.log(res[0])
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log(res)
      this.listData.filterPredicate = (data, filter) => {

        return this.displayedColumns.some(ele => {
          if (typeof data[ele] === "string") {
            return data[ele].toLowerCase().indexOf(filter) != -1;
          }
        });
      };
    });

  }
  getCenters(SectionId, space) {

    this.service.getCenters(SectionId, space).subscribe((res: any) => {
      this.centID=SectionId;
      this.follow = res;
      console.log(this.follow)
      console.log(res[0])
      this.order = 1;
      console.log(this.order)
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

  getMangs(SectionId, centid) {
    console.log("SectionId " + SectionId + " centid " + centid)
    this.service.getMangs(SectionId, centid).subscribe((res: any) => {
      this.MangmetsID=SectionId;
      console.log("this.centID  "+this.centID)
      this.sec = SectionId;
      this.cent = centid;
      this.order = 2;
      
      console.log(" this.order "+this.order)

      console.log("res============")
      console.log(res)
      console.log(SectionId + "      " + centid)
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
  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listDataForsearch.filter = this.searchKey.trim().toLowerCase();
  }

  getRecord(row) {
    console.log(row);
    if (row.space == 6) {
      this.dialogRef.close(row);
    }else if (row.cent == 0) {
      console.log("row.sec = " + row.sec + "row.cent = " + row.cent)
      this.getCenters(row.ID,3)

    }
    else if (row.cent != 0 && row.mang == 0) {
      console.log("row.sec = " + row.sec + "row.cent = " + row.cent)
      this.getMangs(row.ID, row.cent)

    } else if (row.cent != 0 && row.mang != 0 && row.mang1 == 0) {
      console.log('row.mang1 == 0 && row.mang!=0 ' + row.mang1 + "" + row.mang)
      this.service.getMangs1(row.ID, row.cent, row.mang).subscribe((res: any) => {
        this.Mangmets1ID=row.ID;
        this.sec = row.sec;
        this.cent = row.cent;
        this.mang = row.mang;
        this.order = 3
        console.log(" this.order "+this.order)

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
    } else if (row.cent != 0 && row.mang != 0 && row.mang1 != 0) {
      console.log('row.cent != 0 && row.mang != 0 && row.mang1 != 0')
      this.service.getMangs2(row.ID, row.cent, row.mang, row.mang1).subscribe((res: any) => {
        this.Mangmets2ID=row.ID;
        this.sec = row.sec;
        this.cent = row.cent;
        this.mang = row.mang;
        this.mang1 = row.mang1;
        this.order = 4
        console.log(" this.order "+this.order)
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


  }

  chooseRecord(row) {
    console.log(row)
    this.dialogRef.close(row);
  }
  onClose() {
    this.dialogRef.close();
    //this..controls["SectionId"].setValue("");

  }

  onBack() {
    console.log("-----------------------"+this.order)
    if (this.order == 1) {
      //this.getCenters(this.sec,3)
      console.log(this.centID)
      this.order=0;
      //this.getCenters(this.centID,3)
      this.getSectors()


      //this.getMangs(this.sec, this.cent)
    } else if (this.order == 2) {
      //this.getMangs(this.sec,this.cent);
      this.order=1;
      console.log('this.order == 2')
      //this.getMangs(this.MangmetsID,this.cent);
      this.getCenters(this.centID,3)
      /*this.service.getMangs1(this.sec, this.cent, this.mang).subscribe((res: any) => {
        
        console.log('------------------------------')
        console.log('-------------'+this.sec+' '+this.cent+' '+this.mang)
        console.log(res)
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
      });*/
    }else if(this.order == 3){
      
      /*this.service.getMangs1(this.sec, this.cent, this.mang).subscribe((res: any) => {
        
        console.log('------------------------------')
        console.log('-------------'+this.sec+' '+this.cent+' '+this.mang)
        console.log(res)
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
      });*/
      console.log('this.order == 3')
      this.getMangs(this.MangmetsID,this.cent)
      /*this.service.getMangs1(this.Mangmets1ID, this.cent, this.mang).subscribe((res: any) => {
        
        console.log('------------------------------')
        console.log('-------------'+this.sec+' '+this.cent+' '+this.mang)
        console.log(res)
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
      });*/
      this.order=2;
      /*this.service.getMangs2(this.sec, this.cent, this.mang, this.mang1).subscribe((res: any) => {
        
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
      });*/
    }else if(this.order == 4){

      this.service.getMangs1(this.Mangmets1ID, this.cent, this.mang).subscribe((res: any) => {
        console.log('this.order == 4')
        console.log('------------------------------')
        console.log('-------------'+this.sec+' '+this.cent+' '+this.mang)
        console.log(res)
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
      this.order=3;
    }
  }

  flag;
  shearch(){
    this.flag=1;
    this.listData=null;
    console.log(this.listData)
    //this.listData.sort = null;
    //this.listData.paginator = null;
    this.service.GetMangsForSearch(this.searchKey).subscribe((res: any) => {
        
      console.log('------------------------------')
      console.log(res)
      this.listDataForsearch = new MatTableDataSource(res);
      this.listDataForsearch.sort = this.sortForSearch;
      this.listDataForsearch.paginator = this.paginator;
      this.listDataForsearch.filterPredicate = (data, filter) => {
        console.log(data);

        return this.displayedColumnsForSearch.some(ele => {
          if (typeof data[ele] === "string") {
            console.log(data[ele]);

            return data[ele].toLowerCase().indexOf(filter) != -1;
          }
         
        });
      };
    });
  }

  getSectors2(){
    this.listDataForsearch = null;
    //this.listDataForsearch.paginator =null;
      //this.listDataForsearch.sort = null;
      //this.listDataForsearch.paginator = null;
      this.flag=0
    this.getSectors();
  }

}
