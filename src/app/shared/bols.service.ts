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
export class BOLService {

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

  getBols(body) {
    return this.http.post(environment.apiUrl+"BOLs/GetBaseBOLData/", body);
  }

 

}
