import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';  
import { HttpHeaders } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  productForm:FormGroup=this.fb.group({
    CDLRNumber:["",Validators.required],
    CDLRIsn:["",Validators.required],
    CDRLDetails:["",Validators.required],
    ExcelFile:["",Validators.required],
    DDBIdentification:["1",Validators.required],
    ServerName:["",Validators.required],
    Message:[""]
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
}
