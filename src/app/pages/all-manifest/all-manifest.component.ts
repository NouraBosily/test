import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DeclartionService } from '../../shared/declartion.service';
import { Subscription, interval } from 'rxjs';
import { ManefistsService } from '../../shared/Manefists.service';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'ngx-all-manifest',
  templateUrl: './all-manifest.component.html',
  styleUrls: ['./all-manifest.component.scss']
})
export class AllManifestComponent implements OnInit {
  message: any;

  ngOnDestroy(): void {
    //this.updateSubscription.unsubscribe();
  }
  private updateSubscription: Subscription;
  constructor(private service: ManefistsService, private route: Router, 
  ) {
  }

  listData: MatTableDataSource<any>;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["MNFSTYear", "MNFSTRoadNo", "PortNumber", "ArrivalDate", "ShipName", "CallSign", "actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {



    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //console.log(payload.USERName);
    let body = {
      "name": payload.USERName
    }
    this.getManifests(body);

  }

  getManifests(body) {

    this.service.getAvailableManefistsList(body).subscribe((res: any) => {
      //this.message = res.toString();
      //console.log(res)
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      //console.log(payload.USERName);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      //console.log("res.MSCData");
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.route.navigate(['/pages/declartion/add']);
  }
  onEdit(isn, id) {
    //console.log(isn);
    //console.log(id);
    this.route.navigate(["/pages/details"]);
  }


  showManifest(MNFSTIsn, DDBIdentification) {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let DCRTNIsn = payload.USERName;

    this.route.navigateByUrl('/pages/details/' + MNFSTIsn + "/" + DDBIdentification);
  }

  showBols(MNFSTIsn, DDBIdentification) {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let DCRTNIsn = payload.USERName;

    this.route.navigateByUrl('/pages/bols/' + MNFSTIsn + "/" + DDBIdentification);
  }

}
