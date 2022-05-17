import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TreaterPaymentService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

treaterPaymentForm:FormGroup=this.fb.group({
  TreaterPayMentId:["0"],
  TreaterPayMentCode:["0"],
  SafeId:["",Validators.required],
  TreaterId:["",Validators.required],
  PaMentTypeId:["",Validators.required],
  PayMentValue:["",Validators.required],
  DocTypeId:["",Validators.required],

})


  getAllTreaterPayment(DocTypeId){
    return this.http.get(environment.apiUrl+"TreaterPayMents/getList?id="+DocTypeId);
  }

  getExpensesTreaterPayment(DocTypeId)
  {
    return this.http.get(environment.apiUrl+"TreaterPayMents/ExpensesPayment?id="+DocTypeId)
  }

 

  postTreaterPayment(body){
    return  this.http.post(environment.apiUrl+"TreaterPayMents",body)
  }

  getOneTreaterPayment(TreaterPayMentId){
    return this.http.get(environment.apiUrl+"TreaterPayMents/getOne?id="+TreaterPayMentId);
  }
}
