import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TreaterAccountsService {
  transaction:any[]=[];
  transaction2:any[]=[];
  settlements:any []=[];
  discardTransaction:any[]=[];
  paymentTo:any[]=[];
  paymentFrom:any[]=[];
  CheckFrom:any[]=[];
  CheckTo:any[]=[];


  constructor(private http:HttpClient) { }

  getAllTreaterAccounts(TreaterTypeId){
    return this.http.get(environment.apiUrl+"TreaterAccounts/byTreaterFlag?id="+TreaterTypeId);
  }
  

  getOneTreater(TreaterId)
  {
    return this.http.get(environment.apiUrl+"TreaterAccounts/byTreaterId?id="+TreaterId);
  }

  getTreaterReports(TreaterId){
    return this.http.get(environment.apiUrl+"Reports/"+TreaterId)
  }

}
