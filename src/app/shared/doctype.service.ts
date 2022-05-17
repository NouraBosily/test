import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctypeService {

  constructor(private http:HttpClient) { }

  getPurchaseDoctype(){
    return this.http.get(environment.apiUrl+"DocTypes/getPurchase/")
  }

getPurchaseothers(){
  return this.http.get(environment.apiUrl+"DocTypes/getPurchaseOthers/")
}

  getPurchaseMission(){
    return this.http.get(environment.apiUrl+"DocTypes/getPurchaseMission/")
  }
  getDiscardPurchaseMission(){
    return this.http.get(environment.apiUrl+"DocTypes/getDiscardPurchaseMission")
  }

  getPurchaseLeave(){
    return this.http.get(environment.apiUrl+"DocTypes/getPurchaseLeave")
  }

  getLeavesDocType(){
    return this.http.get(environment.apiUrl+"DocTypes/getLeavesDocType")
  }
  getDiscardPurchaseLeave(){
    return this.http.get(environment.apiUrl+"DocTypes/getDiscardPurchaseLeave")
  }
  getPurchaseRummy(){
    return this.http.get(environment.apiUrl+"DocTypes/getPurchaseRummy/")
  }
  getPaymentDoctype(){
    return this.http.get(environment.apiUrl+"DocTypes/getPurchase/getPayment")
  }
  getDiscardPurchaseDocType(){
    return this.http.get(environment.apiUrl+"DocTypes/getDiscardPurchaces");
  }


  getDiscardSalesDocType(){
    return this.http.get(environment.apiUrl+"DocTypes/getDiscardSales");
  }
  getDiscardTypeSales(){
    return this.http.get(environment.apiUrl+"DocTypes/getDiscardTypeSales");
  }
  getSalesDoctype(){
    return this.http.get(environment.apiUrl+"DocTypes/getSales")
  }

  getTypeSalesDocType(){
    return this.http.get(environment.apiUrl+"DocTypes/getTypeSales")
  }
  
}
