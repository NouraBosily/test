import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StoreTransactionsService {

  

  constructor(private http:HttpClient,private fb:FormBuilder) { }

storeTransactionForm:FormGroup=this.fb.group({
  StoreTransActionMasterId:["0",Validators.required],
  StoreIdFrom:["",Validators.required],
  StoreTypeIdFrom:["",Validators.required],
  StoreTypeIdTo:["",Validators.required],
  StoreIdTo:["",Validators.required],
  TotalKilo:[{value: '0', disabled: true}],
  TotalBucket:[{value: '0', disabled: true}],
  NetTotalWeight:[{value: '0', disabled: true}],
  TotalOpen:[{value: '0', disabled: true}]
})
storeTransactionDetailsForm:FormGroup=this.fb.group({
  StoreTransActionDetailId:["0"],
  StoreTransActionMasterId:["0"],
  PatchNumber:["",[Validators.required,Validators.min(0)]],
  GroupId:["",Validators.required],
  GroupDesc:["",Validators.required],
  ItemId:["",Validators.required],
  ItemDesc:["",Validators.required],
  CheckedQuantity:[""],
  ItemsStandardId:["",Validators.required],
  ItemsStandardDesc:["",Validators.required],
  CurrentRecivedQuantity:["",Validators.required]
})

  whiteStoreForm:FormGroup=this.fb.group({

    StoreIdTo:["",Validators.required],

    PatchNumber:["",Validators.required],
    WhiteCheeseRecieveOrderMasterId:["",Validators.required]
  })
  StoreTransActionDetailList:any[]=[];


  getAllStoreTransaction(type){
    if(type=="transactionQuality")
    {
    return this.http.get(environment.apiUrl+"StoreTransActionMasters/forQuality");
    }
   else  if(type=="transactionAdmin")
    {
      return this.http.get(environment.apiUrl+"StoreTransActionMasters/forAdmin");
    }
    else if(type=="transactionWharehouse")
    {
      return this.http.get(environment.apiUrl+"StoreTransActionMasters/forWharehouse");
    }
    else if(type=="transactionReceiver")
    {
      return this.http.get(environment.apiUrl+"StoreTransActionMasters/forReceiver");
    }
   
  }



  RegisterQuality(StoreTransActionMasterId)
  {
   return this.http.delete(environment.apiUrl+"StoreTransActionMasters/RegisterQuality?id="+StoreTransActionMasterId);
  }



  registerAdmin(StoreTransActionMasterId){
    return this.http.delete(environment.apiUrl+"StoreTransActionMasters/RegisterAdmin?id="+StoreTransActionMasterId);
  }

  RegisterWharehouse(StoreTransActionMasterId){
    return this.http.delete(environment.apiUrl+"StoreTransActionMasters/RegisterWharehouse?id="+StoreTransActionMasterId);
  }

  RegisterReceiver(StoreTransActionMasterId){
    return this.http.delete(environment.apiUrl+"StoreTransActionMasters/RegisterReceiver?id="+StoreTransActionMasterId);
  }












  getStoreTransactionsForAll(){
    return this.http.get(environment.apiUrl+"StoreTransActionMasters/GetAll");
  }

  getOneStoreTransationsForReport(StoreTransActionMasterId){
return this.http.get(environment.apiUrl+"StoreTransActionMasters/forReports?id="+StoreTransActionMasterId);
  }

postTransaction(body){
return this.http.post(environment.apiUrl+"StoreTransActionMasters",body);
}

postWastingQuantity(body){
return this.http.post(environment.apiUrl+"StoreWharehouses/StoreWastingQuantity",body)
}

postQuantity(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/StoreQuantity",body)
}

posttransactionAfterSettlements(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/transactionAfterSettlements",body)
}

postReturnReceiversStores(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/ReturnReceiversStores",body)
}

convertItems(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/ConvertItem",body)
}

convertBucket(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/ConvertBucket",body)
}
mediatorBox(body){
  return this.http.post(environment.apiUrl+"StoreWharehouses/mediatorBox",body)
}
}
