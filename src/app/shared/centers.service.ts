import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CentersService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  postCenters1(body){
    return this.http.post(environment.apiUrl+"Centers1",body);
  }

  putCenters1(id,body){
    return this.http.put(environment.apiUrl+"Centers1/"+id,body);
  }
  postMangments(body){
    return this.http.post(environment.apiUrl+"Mangments",body);
  }
  postMangments1(body){
    return this.http.post(environment.apiUrl+"Mangments1",body);
  }
  postMangments2(body){
    return this.http.post(environment.apiUrl+"Mangments2",body);
  }
  Getdevices3ReportForCaseAndModelForTwoOptions(model, printercase,code,type,CustomsAreaId) {
    return this.http.post(environment.apiUrl + "devices3/Getdevices3ReportForCaseAndModelForTwoOptions?model=" + model+"&&code="+code+"&&type="+type+"&&customsArea="+CustomsAreaId ,printercase)
      //"&&printercase=" + encodeURIComponent(JSON.stringify(printercase)));
  }
  deleteCenters1(centerId){
    return this.http.delete(environment.apiUrl+"Centers1/"+centerId);
  }
  getCenters1ByCenterID(id){
    return this.http.get(environment.apiUrl+"centers1/GetCenters1ByID?id="+id);
  }
  GetMangmentsByID(id){
    return this.http.get(environment.apiUrl+"Mangments/GetMangmentsByID?id="+id);
  }
  GetMangments1ByID(id){
    return this.http.get(environment.apiUrl+"Mangments1/GetMangments1ByID?id="+id);
  }
  GetMangments2ByID(id){
    return this.http.get(environment.apiUrl+"Mangments2/GetMangments2ByID?id="+id);
  }
}
