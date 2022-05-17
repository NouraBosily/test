import { Component, OnInit } from '@angular/core';
import { BolDetailsService } from '../../shared/bol-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-bol-details',
  templateUrl: './bol-details.component.html',
  styleUrls: ['./bol-details.component.scss']
})
export class BolDetailsComponent implements OnInit {

  constructor(public service: BolDetailsService,private activeRoute: ActivatedRoute,private route: Router) { }
  BOLIsn;
  BOLDDBIdentification;
  ngOnInit() {
    this.BOLIsn = this.activeRoute.snapshot.paramMap.get("BOLIsn");
    this.BOLDDBIdentification = this.activeRoute.snapshot.paramMap.get("DDBIdentification");
    //console.log("this.BOLIsn   " + this.BOLIsn);
    //console.log("this.DDBIdentification   " + this.BOLDDBIdentification);
    let body = {
      "BOLIsn": parseInt(this.BOLIsn),
      "BOLDDBIdentification":parseInt(this.BOLDDBIdentification)
    }
    this.service.getBolDetails(body).subscribe((res: any) => {
      //console.log(res);
      this.service.MainManifestForm.controls['BOLIsn'].setValue(res[0].bolIsn);
      this.service.MainManifestForm.controls['DDBIdentification'].setValue(res[0].ddbIdentification);
      this.service.MainManifestForm.controls['BOLNumber'].setValue(res[0].bolNumber);
      this.service.MainManifestForm.controls['LoadingPort'].setValue(res[0].loadingPort);
      this.service.MainManifestForm.controls['LoadingPortName'].setValue(res[0].loadingPortName);
      this.service.MainManifestForm.controls['BOLLoadingDate'].setValue(res[0].bolLoadingDate);
      this.service.MainManifestForm.controls['ShagCDLRISN'].setValue(res[0].shagCDLRISN);
      this.service.MainManifestForm.controls['ShagCDLRDDBIdentification'].setValue(res[0].shagCDLRDDBIdentification);
      this.service.MainManifestForm.controls['CDLRArabicName'].setValue(res[0].cdlrArabicName);
      this.service.MainManifestForm.controls['CDLRNumber'].setValue(res[0].cdlrNumber);
      this.service.MainManifestForm.controls['BOLConsigneeArabicName'].setValue(res[0].bolConsigneeArabicName);
      this.service.MainManifestForm.controls['BOLNotifyName'].setValue(res[0].bolNotifyName);
      this.service.MainManifestForm.controls['BOLShipmentType'].setValue(res[0].bolShipmentType);
      this.service.MainManifestForm.controls['BOLConsolidationCode'].setValue(res[0].bolConsolidationCode);
      this.service.MainManifestForm.controls['CurrentCSYSName'].setValue(res[0].currentCSYSName);
      this.service.MainManifestForm.controls['BOLTotalPackagesCount'].setValue(res[0].bolTotalPackagesCount);
      this.service.MainManifestForm.controls['BOLTotalGrossWeight'].setValue(res[0].bolTotalGrossWeight);
      this.service.MainManifestForm.controls['UOMShortName'].setValue(res[0].uomShortName);
      this.service.MainManifestForm.controls['BOLLastModifiedDate'].setValue(res[0].bolLastModifiedDate);
      this.service.MainManifestForm.controls['BOLCrs'].setValue(res[0].bolCrs);      
      //console.log(this.service.MainManifestForm.value);
    });
  }

  showBolItems(){
      this.route.navigateByUrl('/pages/bol-items/' + this.BOLDDBIdentification + "/" + this.BOLIsn);
  }
}
