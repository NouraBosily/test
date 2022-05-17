import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BOLService } from '../../shared/bols.service';
import { ManefistsService } from '../../shared/Manefists.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-manifest-bols',
  templateUrl: './manifest-bols.component.html',
  styleUrls: ['./manifest-bols.component.scss']
})
export class ManifestBolsComponent implements OnInit {

  message: any;

  ngOnDestroy(): void {
    //this.updateSubscription.unsubscribe();
  }
  constructor(private service: BOLService, private route: Router,  private activeRoute: ActivatedRoute
  ) {
  }

  listData: MatTableDataSource<any>;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["BOLNumber", "LoadingPort", "BOLLoadingDate", "actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  MNFSTIsn
  DDBIdentification
  ngOnInit() {

    this.MNFSTIsn = this.activeRoute.snapshot.paramMap.get("MNFSTIsn");
    this.DDBIdentification = this.activeRoute.snapshot.paramMap.get("DDBIdentification");

    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //console.log(payload.USERName);
    /*let body = {
      "name": payload.USERName
    }*/
  let body=  {
      "CDLRNumber":payload.USERName,
      "MNFSTDDBIdentification":parseInt(this.DDBIdentification),
      "MNFSTIsn":parseInt(this.MNFSTIsn)
  }
    this.getBols(body);

  }

  getBols(body) {

    this.service.getBols(body).subscribe((res: any) => {
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

  showBolDetails(DDBIdentification, BOLIsn) {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let DCRTNIsn = payload.USERName;

    this.route.navigateByUrl('/pages/bol-details/' + DDBIdentification  + "/" + BOLIsn);
  }

 
}
