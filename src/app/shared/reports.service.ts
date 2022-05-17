import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {



  constructor(private http: HttpClient, private fb: FormBuilder) { }

  userRolesForm: FormGroup = this.fb.group({
    UserId: ["", Validators.required],
    RoleId: ["", Validators.required]
  })

  getReportModelAndCase(model, printercase,code,type) {
    return this.http.post(environment.apiUrl + "devices3/Getdevices3Report?model=" + model[0]+"&&model=" + model[1]+"&&model=" + model[2]
    +"&&model="+ model[3]+"&&model=" + model[4]+"&&model="+ model[5]+"&&model=" + model[6]+"&&code="+code+"&&type="+type ,printercase)
      //"&&printercase=" + encodeURIComponent(JSON.stringify(printercase)));
  }
  Getdevices3ReportForCaseAndModelForTwoOptions(model, printercase,code,type,CustomsAreaId) {
    return this.http.post(environment.apiUrl + "devices3/Getdevices3ReportForCaseAndModelForTwoOptions?model=" + model[0]+"&&model=" + model[1]+"&&model=" + model[2]
    +"&&model="+ model[3]+"&&model=" + model[4]+"&&model="+ model[5]+"&&model=" + model[6]+
    "&&code="+code+"&&type="+type+"&&customsArea="+CustomsAreaId ,printercase)
      //"&&printercase=" + encodeURIComponent(JSON.stringify(printercase)));
  }
  Getdevices3ReportDetailsItem(deviceid, model, printercase) {
    return this.http.get(environment.apiUrl + "devices3/Getdevices3ReportDetailsItem?deviceid=" + deviceid + "&&model=" + model + "&&printercase=" + printercase);
  }

  GetDevices3ReportByYear(year,code,type) {
    return this.http.get(environment.apiUrl + "devices3/GetDevices3ReportByYear?year=" + year+"&&code="+code+"&&type="+type);
  }
  GetDevices3ReportByYearForTwoOptions(year,code,type,CustomsAreaId){
    return this.http.get(environment.apiUrl + "devices3/GetDevices3ReportByYearForTwoOptions?year=" + year+"&&code="+code+"&&type="+type+"&&customsArea="+CustomsAreaId);

  }
  
  GetDevices3ReportByTwoDatesForTwoOptions(date1,date2,code,type,CustomsAreaId) {
    return this.http.get(environment.apiUrl + "devices3/GetDevices3ReportByTwoDatesForTwoOptions?date1=" + date1+"&&date2="+date2+"&&code="+code+"&&type="+type+"&&customsArea="+CustomsAreaId);
  }

  GetdevicesContainOrNotContain(code,type,deviceType, containOrNotContain) {
    return this.http.get(environment.apiUrl + "devices/GetdevicesContainOrNotContain?code="+code+"&&type="+type+"&&deviceType=" + deviceType + "&&containOrNotContain=" + containOrNotContain);
  }

  GetdevicesContainOrNotContainForSectorsAndCustomsArea(code,type,deviceType, containOrNotContain,CustomsAreaId) {
    return this.http.get(environment.apiUrl + "devices/GetdevicesContainOrNotContainForSectorsAndCustomsArea?code="+code+"&&type="+type+"&&deviceType=" + deviceType + "&&containOrNotContain=" + containOrNotContain+"&&customArea="+CustomsAreaId);
  }

  GetdevicesNeeds() {
    return this.http.get(environment.apiUrl + "devices/GetdevicesNeeds");
  }

  getDevicesCountForSectors(code, type) {
    return this.http.get(environment.apiUrl + "devices/GetReportDevicesCount?code=" + code + "&&type=" + type);
  }
  getAllMarks() {
    return this.http.get(environment.apiUrl + "marks");
  }

  getDevice(id) {
    return this.http.get(environment.apiUrl + "devices3/" + id);
  }

  getDevices3List(deviceid, model) {
    return this.http.get(environment.apiUrl + "devices3/GetDevices1?deviceid=" + deviceid + "&&model=" + model);
  }
  getAdministrationName(code) {
    return this.http.get(environment.apiUrl + "devices/getAdminName?affiliatemanagement=" + code);
  }

  insertDevice(body) {
    return this.http.post(environment.apiUrl + "devices3", body);
  }

  UpdateDevice(id, body) {
    return this.http.put(environment.apiUrl + "devices3/" + id, body);
  }


}
