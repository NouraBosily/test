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
export class BolItemsService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //EDIErrors :[];
  
  MainManifestForm: FormGroup = this.fb.group({
    BOLIIsn: ["0"],
    DDBIdentification: ["0", Validators.required],
    BOLIsn: ["0"],
    BOLINumber: ["0", Validators.required],
    CNTRNumber: ["0", Validators.required],
    SealNumber: ["0", Validators.required],
    ISOCode: ["0", Validators.required],
    ActualWgt: ["", Validators.required],
    ActualWgtUOM: ["", Validators.required],
    ExpectedWgt:[""],
    ExpectedWgtUOM:[""],
    ActualQty:[""],
    ActualQtyUOM:[""],
    ExpectedQty:[""],
    ExpectedQtyUOM:[""],
    Size:[""],
    SizeUOM:[""],
    ContentQty:[""],
    ContentQtyUOM:[""],
    Description:[""],
    Whouse:[""],
    Tariff:[""],
    BOLICrs:[""],
  })

  getBolItems(body) {
    return this.http.post(environment.apiUrl+"BOLs/BolItemsData", body);
  }

 

}
