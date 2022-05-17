import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TreatersService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  treaterForm:FormGroup=this.fb.group({
    TreaterId:["0"],
    TreaterName:["",Validators.required],
    TreaterAddress:[""],
    TreaterPhone:[""],
    TreaterFax:[""],
    TreaterEmail:["",Validators.email],
    TreaterBeginingBalance:["0",Validators.required],
    TreaterFlagId:["",Validators.required],
    IsActive:[true]
  })

  getAllTreatersByFlag( TreaterFlagId){
    return this.http.get(environment.apiUrl+"treaters/ByFlagId?id="+TreaterFlagId);
  }



  getExpenses(TreaterFlagId){
    return this.http.get(environment.apiUrl+"treaters/GetForRevenue?id="+TreaterFlagId);
  }

  getOneTreater(TreaterId){
    return this.http.get(environment.apiUrl+"treaters/byId?id="+TreaterId);
  }
  getTreaterByPatchNumber(PatchNumber){
    return this.http.get(environment.apiUrl+"treaters/PatchNumber?id="+PatchNumber)
  }

  postTreater(body)
  {
    return this.http.post(environment.apiUrl+"treaters",body);
  }

  putTreater(TreaterId,body){
    return this.http.put(environment.apiUrl+"treaters/"+TreaterId,body)
  }

  deleteTreater(TreaterId){
    return this.http.delete(environment.apiUrl+"treaters/"+TreaterId);
  }
}
