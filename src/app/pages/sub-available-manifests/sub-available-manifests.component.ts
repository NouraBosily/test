import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SubAgentService } from '../../shared/sub-agent.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'ngx-sub-available-manifests',
  templateUrl: './sub-available-manifests.component.html',
  styleUrls: ['./sub-available-manifests.component.scss']

})
export class SubAvailableManifestsComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  listData: MatTableDataSource<any>;
  //displayedColumns: string[] = ["DCRTNIsn","declarationNumber","CDLRArabicName","CSVPName","colltyeCCTShortName","actions"];
  displayedColumns: string[] = ["MNFSTRoadNo", "MNFSTYear", "PortNumber", "ArrivalDate"
    , "ShipENGName", "ShipName", "ShipIMORegNumber", "CallSign", "actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  isSearched;
  constructor(public subAgentService: SubAgentService, private route: Router) { }

  ngOnInit() {
    this.isSearched = false;
    //console.log(this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber)
    this.fillYears();
  }
valid;
length1:number;
submitted;
  submit() {
    
    this.submitted = true;
    if (this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber && !this.subAgentService.subAgentForm.get('nested').value.MNFSTYear ) {
      //console.log("invalid");
      //console.log(this.subAgentService.subAgentForm.value);
      return;
    }
    /* if( this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber && !this.subAgentService.subAgentForm.get('nested').value.MNFSTYear){
this.valid=false;
    } */
    //console.log('------------')
    //console.log(this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber);
    //console.log('------------')

    if(!this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber){
this.subAgentService.subAgentForm.patchValue({
  nested:{ "MNFSTRoadNumber":0,
  "MNFSTYear":0}
})
//console.log(this.subAgentService.subAgentForm.value)
    }
    var body = {
      "MNFSTVesselVisitId": this.subAgentService.subAgentForm.controls['MNFSTVesselVisitId'].value,
      "MNFSTRoadNumber": this.subAgentService.subAgentForm.get('nested').value.MNFSTRoadNumber,
      "MNFSTYear": this.subAgentService.subAgentForm.get('nested').value.MNFSTYear,
      "MNFSTArrivalDate": this.subAgentService.subAgentForm.controls['MNFSTArrivalDate'].value,
      "SHIPEnglishName": this.subAgentService.subAgentForm.controls['SHIPEnglishName'].value,
      "SHIPArabicName": this.subAgentService.subAgentForm.controls['SHIPArabicName'].value,
      "SHIPCallSign": this.subAgentService.subAgentForm.controls['SHIPCallSign'].value,
      "SHIPIMORegNumber": this.subAgentService.subAgentForm.controls['SHIPIMORegNumber'].value,
      "CDLRNumber": this.subAgentService.subAgentForm.controls['CDLRNumber'].value
    }
    //console.log(body)
    this.subAgentService.GetAllManifestByParam(body).subscribe((res: any) => {
      this.length1=res.length;
      this.isSearched = true;
      this.listData = new MatTableDataSource(res);
      //console.log(res.length)
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      //console.log(res);
    });
  }
  year;
  years;
  fillYears() {
    this.year = (new Date()).getFullYear();
    this.years = [];
    for (var i = 2010; i < 2050; i++) {
      //for (var i = this.year - 1; i < 2050; i++) {

      this.years.push(i);
    }
  }

  showManifest(MNFSTIsn, DDBIdentification) {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let DCRTNIsn = payload.USERName;

    this.route.navigateByUrl('/pages/sub-details/' + MNFSTIsn + "/" + DDBIdentification);
  }

  showBols(MNFSTIsn, DDBIdentification) {
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let DCRTNIsn = payload.USERName;

    this.route.navigateByUrl('/pages/bols/' + MNFSTIsn + "/" + DDBIdentification);
  }
}
