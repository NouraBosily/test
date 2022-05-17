import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,
  ValidationErrors } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';  
import { HttpHeaders } from '@angular/common/http';  


@Injectable({
  providedIn: 'root'
})
export class SubAgentService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  subAgentForm:FormGroup=this.fb.group({
    nested: this.fb.group(
      {
        MNFSTRoadNumber: [""],
        MNFSTYear: [""]
      },
      { validators: concernValidator }
    ),
    MNFSTVesselVisitId:[""],
    //MNFSTRoadNumber:[""],
    //MNFSTYear:[""],
    MNFSTArrivalDate:[""],
    SHIPEnglishName:[""],
    SHIPArabicName:["",],
    SHIPCallSign:[""],
    SHIPIMORegNumber:[""],
    CDLRNumber:['',[ 
    Validators.pattern("[0-9]{9}"),   Validators.minLength(11),
      Validators.maxLength(11) ]]
  })


  getCustomDealerDetails(DDBIdentification,CDRLNumber){
    return this.http.get("https://localhost:44306/api/CustomsDealers/"+DDBIdentification+"/"+CDRLNumber);

  }

  url = 'https://localhost:44306/api/Excel'; 
  //url = 'https://localhost:44388/Api/Excel';  
  
  UploadExcel(formData: FormData) {  
    let headers = new HttpHeaders({ timeout: `${300000}` });  
  
    headers.append('Content-Type', 'multipart/form-data');  
    headers.append('Accept', 'application/json');  
    //headers.append('responseType', 'text' as 'json');

    //const httpOptions = { headers: headers };  
    const httpOptions = { headers, responseType: 'text' as 'json' };  

    return this.http.post(environment.apiUrl + 'Excel/UploadExcel', formData, httpOptions)  
  }  

  GetAllManifestByParam(body){
    return this.http.post(environment.apiUrl+ "MNFST/GetAllManifestByParam/",body);
  }

  GetManifestByIsn(body){
    return this.http.post( environment.apiUrl+ "MNFST/CheckManifestIfValid/",body);
  }
  
}

export function concernValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control && control.get("MNFSTRoadNumber") && control.get("MNFSTYear").value && !control.get('MNFSTRoadNumber').value) {
    console.log('-------------')
    return { concernsError: false }
  }
  return null;
}
