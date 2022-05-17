import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import { NotificationService } from '../../shared/notification.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'ngx-test',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  id;
  ExportPermitIsn;
  LoadingPORTIsn;
  ShipmentType;
  usersTypeArray = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];
  constructor(private fb: FormBuilder,
    private service: UsersService,
    private dialog: MatDialog,
    private route1: Router,
    private route: ActivatedRoute,
    private router:Router,
    public datepipe: DatePipe,
    private notificationService: NotificationService
    ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ "flag","user", "password", "dateentry", "startdate", "enddate","actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
   
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let UserType = payload.UserType;
    if(UserType == 2){
    this.router.navigateByUrl('/pages/forbidden');
    }
    //this.dbid = this.route.snapshot.paramMap.get('DDBIdentification');
    //this.ExportPermitIsn = this.route.snapshot.paramMap.get('ExportPermitIsn');
    //this.LoadingPORTIsn = this.route.snapshot.paramMap.get('LoadingPortIsn');
    //console.log('-----------')
    //console.log(this.ExportPermitIsn);
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe((res: any) => {
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    });
  }


  onEdit(id) {
    console.log(id);
    this.route1.navigate(["/pages/userform/edit/" + id ]);
  }

  onCreate() {
    this.route1.navigate(['/pages/userform/add/']);
  }
  onDelete(id) {
    if ( id > 0) {
      if (confirm('؟ هل أنت متأكد من عملية الحذف')) {
        this.service.deleteUser(id).subscribe(res => {
          this.notificationService.success('تم الحذف بنجاح');
          this.getAllUsers();
        });
      }
    }
  }

}
