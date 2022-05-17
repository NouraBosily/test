import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Server } from '../pages/model/Server';
import { EDIErrors } from '../pages/model/EDIErrors';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ManefistsMainDetailsService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //EDIErrors :[];
  
  MainManifestForm: FormGroup = this.fb.group({
    MNFSTYear: ["0", Validators.required],
    MNFSTRoadNo: ["0", Validators.required],
    MNFSTDDBId: ["0", Validators.required],
    MNFSTIsn: ["0", Validators.required],
    PortNumber: ["0", Validators.required],
    ArrivalDate: ["0", Validators.required],
    ShipName: ["", Validators.required],
    CallSign: ["", Validators.required],
    EDIFile:[""]
  })

  getManifestMainDetails(body) {
    return this.http.post(environment.apiUrl+"MNFST/ManifestData/", body);
  }

  UploadEDI(formData: FormData) {
    
    let headers = new HttpHeaders({ timeout: `${300000}` });
    headers.append('Content-Type', 'multipart/form-data');
    //headers.append('responseType', 'text' as 'json');
    return this.http.post( environment.apiUrl+'EDI/ECAFileUpload', formData, { headers: headers })
  }

}
