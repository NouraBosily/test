import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Server } from '../pages/model/Server';
import { EDIErrors } from '../pages/model/EDIErrors';

@Injectable({
  providedIn: 'root'
})
export class BolDetailsService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //EDIErrors :[];
  
  MainManifestForm: FormGroup = this.fb.group({
    BOLIsn: ["0"],
    DDBIdentification: ["0", Validators.required],
    BOLNumber: ["0", Validators.required],
    LoadingPort: ["0", Validators.required],
    LoadingPortName: ["0", Validators.required],
    BOLLoadingDate: ["0", Validators.required],
    ShagCDLRISN: ["", Validators.required],
    ShagCDLRDDBIdentification: ["", Validators.required],
    CDLRArabicName:[""],
    CDLRNumber:[""],
    BOLConsigneeArabicName:[""],
    BOLNotifyName:[""],
    BOLShipmentType:[""],
    BOLConsolidationCode:[""],
    CurrentCSYSName:[""],
    BOLTotalPackagesCount:[""],
    BOLTotalGrossWeight:[""],
    UOMShortName:[""],
    BOLLastModifiedDate:[""],
    BOLCrs:[""],

  })

  getBolDetails(body) {
    return this.http.post(environment.apiUrl+"BOLs/BillsExtraData", body);
  }

 

}
