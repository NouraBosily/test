import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Router,ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DeclartionService } from '../../shared/declartion.service';
import { Subscription, interval } from 'rxjs';
import { ManefistsService } from '../../shared/Manefists.service';
import { UsersService } from '../../shared/users.service';
import { BolItemsService } from '../../shared/bol-items.service';

@Component({
  selector: 'ngx-bol-items',
  templateUrl: './bol-items.component.html',
  styleUrls: ['./bol-items.component.scss']
})
export class BolItemsComponent implements OnInit {

  message: any;
  BOLIsn;
  BOLDDBIdentification;
  ngOnDestroy(): void {
    //this.updateSubscription.unsubscribe();
  }
  private updateSubscription: Subscription;
  constructor(private service: BolItemsService, private route: Router, private activeRoute: ActivatedRoute
  ) {
  }

  listData: MatTableDataSource<any>;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["BOLINumber", "CNTRNumber", "SealNumber", "ISOCode", "ActualWgt","ActualWgtUOM",
  "ExpectedWgt","ExpectedWgtUOM","ActualQty","ActualQtyUOM","ExpectedQty","ExpectedQtyUOM","Size","SizeUOM","ContentQty",
    "ContentQtyUOM","Description","Tariff","BOLICrs"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {


    this.BOLIsn = this.activeRoute.snapshot.paramMap.get("BOLIsn");
    this.BOLDDBIdentification = this.activeRoute.snapshot.paramMap.get("DDBIdentification");
    let body = {
      "BOLIsn": parseInt(this.BOLIsn),
      "BOLDDBIdentification":parseInt(this.BOLDDBIdentification)
    }

    this.getBolItems(body);

  }

  getBolItems(body) {

    this.service.getBolItems(body).subscribe((res: any) => {
      //this.message = res.toString();
      //console.log(res)
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      //console.log(payload.USERName);
      this.listData = new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log(res)
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

  showBolItemDetails(BOLIIsn,DDBIdentification) {
    this.route.navigateByUrl('/pages/bol-item-details/' + DDBIdentification + "/" + BOLIIsn);
  }
}
