import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class CustomsInvoicesService {

  customsInvoiceMasterForm:FormGroup=this.fb.group({
    CustomsInvoiceMasterId:["0",Validators.required],
    CustomsInvoiceMasterCode:["0",Validators.required],
    SafeId:["",Validators.required],
    CustomsInvoiceDesc:[""],
    CompanyValues:[""],
    CustomsValues:[""],
    AddedValue:["",[Validators.required,Validators.min(0)]],
    TotalValue:["",[Validators.required,Validators.min(0)]],
    Notes:[""]
  })


  customsInvoiceDetailForm:FormGroup=this.fb.group({
    CustomsInvoiceDetailId:["0",Validators.required],
    CustomsInvoiceMasterId:["0",Validators.required],
    TreaterId:["",Validators.required],
    TreaterName:["",Validators.required],
    TreaterValue:["",Validators.required]
  })


  customPersonInvoiceDetails:any[]=[];
  customCompanyInvoiceDetails:any[]=[];

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  getAllCustomInvoices(){
    return this.http.get(environment.apiUrl+"CustomsInvoiceMasters")
  }

  getForReports(CustomsInvoiceMasterId){
    return this.http.get(environment.apiUrl+"CustomsInvoiceMasters/"+CustomsInvoiceMasterId)
  }

  postCustomsInvoice(body){
return this.http.post(environment.apiUrl+"CustomsInvoiceMasters",body);
  }
}
