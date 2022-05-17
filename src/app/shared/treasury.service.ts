import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EINPROGRESS } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  TreasuryForm:FormGroup=this.fb.group({

    PaymentTypeIdFrom:["",Validators.required],
    PaymentTypeIdTo:["",Validators.required],
    SafeIdFrom:["",Validators.required],
    SafeIdTo:["",Validators.required],
    Balance:["",[Validators.required,Validators.min(0)]]
  })

  getBalance(SafeId){
    return this.http.get(environment.apiUrl+"Treasury/checkCurrentValue?id="+SafeId);
  }

  getTreasuryByFlagSafe(FlagSafe){
 return this.http.get(environment.apiUrl+"Treasury/bySafeFlag?id="+FlagSafe);
  }

  postTreasury(body){
    return this.http.post(environment.apiUrl+"Treasury",body);
  }
}
