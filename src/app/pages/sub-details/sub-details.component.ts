import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../shared/product.service';
import { Product } from '../model/Product';
import { ServerService } from '../../shared/server.service';
import { Server } from '../model/Server';
import { ManefistsMainDetailsService } from '../../shared/Manefists-main-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDatepickerModule } from "@angular/material";
import { EDIErrors } from '../model/EDIErrors';

@Component({
  selector: 'ngx-sub-details',
  templateUrl: './sub-details.component.html',
  styleUrls: ['./sub-details.component.scss']
})
export class SubDetailsComponent implements OnInit {

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
    , private serverService: ServerService, private activeRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.isLoaded = false;
    this.MNFSTIsn = this.activeRoute.snapshot.paramMap.get("MNFSTIsn");
    this.DDBIdentification = this.activeRoute.snapshot.paramMap.get("DDBIdentification");
    //console.log("this.MNFSTIsn   " + this.MNFSTIsn);
    //console.log("this.DDBIdentification   " + this.DDBIdentification);

    let body = {
      "MNFSTIsn": this.MNFSTIsn,
      "DDBIdentification": this.DDBIdentification
    }
    this.manifestService.getManifestMainDetails(body).subscribe((res: any) => {
      //console.log(res);
      this.manifestService.MainManifestForm.controls["MNFSTIsn"].setValue(res.MNFSTIsn);
      this.manifestService.MainManifestForm.controls["MNFSTDDBId"].setValue(res.MNFSTDDBId);
      this.manifestService.MainManifestForm.controls["MNFSTYear"].setValue(res.MNFSTYear);
      this.manifestService.MainManifestForm.controls["MNFSTRoadNo"].setValue(res.MNFSTRoadNo);
      this.manifestService.MainManifestForm.controls["ArrivalDate"].setValue(res.ArrivalDate);
      this.manifestService.MainManifestForm.controls["PortNumber"].setValue(res.PortNumber);
      this.manifestService.MainManifestForm.controls["ShipName"].setValue(res.ShipName);
      this.manifestService.MainManifestForm.controls["CallSign"].setValue(res.CallSign);
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTIsn"].value)
      //console.log(this.manifestService.MainManifestForm.controls["MNFSTDDBId"].value)

    });
  }

  get f() {
    return this.manifestService.MainManifestForm.controls;
  }
  p: Product;
  id;

  getServerDetails(id) {
    this.serverService.getServerById(id).then((res: Server) => {
      //console.log(res.Serverisn);
      //console.log(res.Server_name);
      //console.log(res.DDBIdentification);
      //console.log(res.Server_Database);
      //console.log(res.Server_arabicName);
      id = res.DDBIdentification;
      this.manifestService.MainManifestForm.controls['DDBIdentification'].setValue(res.DDBIdentification);
      this.message = "";

    });

  }

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
      this.manifestService.UploadEDI(formData).subscribe((result: any) => {
        //console.log(result)
        this.isLoaded = true;

        this.EDIErrors = result;
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
