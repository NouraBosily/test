import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../shared/product.service';
import { Product } from '../model/Product';
import { Server } from '../model/Server';
import { ManefistsMainDetailsService } from '../../shared/Manefists-main-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDatepickerModule } from "@angular/material";
import { EDIErrors } from '../model/EDIErrors';
export interface User {
  ErrorDescription: string;
}
@Component({
  selector: 'ngx-manifest-details',
  templateUrl: './manifest-details.component.html',
  styleUrls: ['./manifest-details.component.scss']
})
export class ManifestDetailsComponent implements OnInit {
  EDIErrors: EDIErrors[];
  posts = [];
  @ViewChild('fileInput', { static: false }) fileInput;
  message: string;
  submitted: boolean = false;
  serversList: Server[];
  MNFSTIsn;
  DDBIdentification;
  isLoaded;

  constructor(private http: HttpClient, public manifestService: ManefistsMainDetailsService
    , private activeRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.isLoaded = false;
    this.MNFSTIsn = this.activeRoute.snapshot.paramMap.get("MNFSTIsn");
    this.DDBIdentification = this.activeRoute.snapshot.paramMap.get("DDBIdentification");
    //console.log("this.MNFSTIsn   " + this.MNFSTIsn);
    //console.log("this.DDBIdentification   " + this.DDBIdentification);

    let body = {
      "MNFSTIsn": parseInt(this.MNFSTIsn),
      "DDBIdentification": parseInt(this.DDBIdentification)
    }
    this.manifestService.getManifestMainDetails(body).subscribe((res: any) => {
      //console.log(res);
      this.manifestService.MainManifestForm.controls["MNFSTIsn"].setValue(res.mnfstIsn);
      this.manifestService.MainManifestForm.controls["MNFSTDDBId"].setValue(res.mnfstddbId);
      this.manifestService.MainManifestForm.controls["MNFSTYear"].setValue(res.mnfstYear);
      this.manifestService.MainManifestForm.controls["MNFSTRoadNo"].setValue(res.mnfstRoadNo);
      this.manifestService.MainManifestForm.controls["ArrivalDate"].setValue(res.arrivalDate);
      this.manifestService.MainManifestForm.controls["PortNumber"].setValue(res.portNumber);
      this.manifestService.MainManifestForm.controls["ShipName"].setValue(res.shipName);
      this.manifestService.MainManifestForm.controls["CallSign"].setValue(res.callSign);
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTIsn"].value)
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTDDBId"].value)

    });
  }

  get f() {
    return this.manifestService.MainManifestForm.controls;
  }
  p: Product;
  id;

  /*customerDealerDetails() {
    console.log('this.id ' + this.manifestService.MainManifestForm.controls['DDBIdentification'].value);
    let ddbid = this.manifestService.MainManifestForm.controls['DDBIdentification'].value;
    let id = this.manifestService.MainManifestForm.controls['CDLRNumber'].value;
    console.log(id)
    this.manifestService.getCustomDealerDetails(ddbid, id).subscribe(res => {
      this.p = res as Product;
      console.log(this.p.CDLRIsn);
      this.manifestService.MainManifestForm.controls["CDRLDetails"].setValue("رقم المتعامل " + this.p.CDLRNumber + "  خاص بــ  " + this.p.CDLRArabicName)
      //this.sss=  "رقم المتعامل "+this.p.CDLRNumber+"  خاص بــ  "+this.p.CDLRArabicName;

      this.manifestService.MainManifestForm.controls["DDBIdentification"].setValue(this.p.DDBIdentification);
      this.manifestService.MainManifestForm.controls["CDLRIsn"].setValue(this.p.CDLRIsn);

      //console.log(      this.proservice.productForm.controls["CDRLDetails"].setValue("رقم المتعامل "+this.p.CDLRNumber+"  خاص بــ  "+this.p.CDLRArabicName) )
    },
      err => {
        if (err.status == 404) {
          this.manifestService.MainManifestForm.controls["CDRLDetails"].setValue("");

          alert('هذا المتعامل موقوف');

        }
        else if (err.status == 400) {
          this.manifestService.MainManifestForm.controls["CDRLDetails"].setValue("");

          alert('ليس متعامل');

        }

        else {

          console.log(err);
        }

      }
    )

  }*/

  uploadFile() {
    this.submitted = true;
    if (this.manifestService.MainManifestForm.invalid) {
      //console.log("invalid");
      //console.log(this.manifestService.MainManifestForm.value);
      return;
    }
    else {
      /*let ddbid = this.proservice.productForm.controls["DDBIdentification"].value;
      let cdrlNumber = this.proservice.productForm.controls["CDLRNumber"].value;
      let CDLRIsn = this.proservice.productForm.controls["CDLRIsn"].value;*/
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTIsn"].value)
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTDDBId"].value)
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

      let CDLRNumber = payload.USERName;
      let MNFSTIsn = this.manifestService.MainManifestForm.controls["MNFSTIsn"].value;
      let MNFSTddbid = this.manifestService.MainManifestForm.controls["MNFSTDDBId"].value;
      let formData = new FormData();
      formData.append('CDLRNumber', CDLRNumber);
      formData.append('MNFSTIsn', MNFSTIsn);
      formData.append('MNFSTddbid', MNFSTddbid);
      formData.append('upload', this.fileInput.nativeElement.files[0])
      //console.log("result");
      this.EDIErrors =[];
      this.manifestService.UploadEDI(formData).subscribe((result: any) => {
        //console.log(result)
        this.isLoaded = true;
        
        this.EDIErrors = result;
        
        if(result.length == 0){
          this.EDIErrors=[{Desc:"تم تحميل الملف بنجاح"}]
          console.log(this.EDIErrors);
          console.log('-----------------------------')
        }
        console.log(this.EDIErrors)
        //console.log(this.EDIErrors)
        //var posts=result.map(a => a.ErrorDescription);
        //console.log(result[1]);
        //console.log(result.json());
        //console.log('result ' +this.EDIErrors[6]);

        this.message = result.toString();

      });
    }
  }

  fileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files[0];
      //console.log(file);
      this.manifestService.MainManifestForm.patchValue({
        ExcelFile: file
      });
    }

  }

}
