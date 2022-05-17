import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceMastersService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
invoiceMasterForm:FormGroup=this.fb.group({
  InvoiceMasterId:["0"],
  DocTypeId:["",Validators.required],
  DocNum:["",Validators.required],
  TreaterId:["",Validators.required],
  SafeId:["",Validators.required],
  StoreId:["",Validators.required],
  PatchNumber:[""],
  TotalValueBeforeDiscount:["",Validators.required],
  DiscountValue:["0"],
  TotalValueAfterDiscount:["",Validators.required],
  IsExportPrice:[""]

})

InvoiceMastersDetailsList:any[]=[];

InvoiceMastersDetailsForm:FormGroup=this.fb.group({
  InvoiceMasterId:["",Validators.required],
  InvoiceDetailId:["",Validators.required],
 ItemId:["",Validators.required],
  CurrentRecivedQuantity:["",Validators.required],
  ItemDesc:["",Validators.required],
  GroupDesc:["",Validators.required],
  GroupId:['',Validators.required],
PurchasePrice:["",Validators.required],
  TotalValue:[{value: '', disabled: true},Validators.required]
})

  getPurchaseWhiteCheeseInvoiceMasters(WhiteCheeseRecieveOrderMasterId){
    return this.http.get(environment.apiUrl+"InvoiceMasters/WhiteCheeseRecieveOrder?id="+WhiteCheeseRecieveOrderMasterId);
  }

  getPurchaseMissionInvoiceMasters(MissionReceiveOrderMasterId){
    return this.http.get(environment.apiUrl+"InvoiceMasters/MissionReceiveOrder?id="+MissionReceiveOrderMasterId);
  }

  getPurchaseLeaveReceiveOrder(LeaveReceiveOrderId)
  {
    return this.http.get(environment.apiUrl+"InvoiceMasters/LeaveReceiveOrder/?id="+LeaveReceiveOrderId);
  }
  postInvoiceMasters(body){
return this.http.post(environment.apiUrl+"InvoiceMasters",body);
  }

  getOneInvoiceMasters(InvoiceMasterId){
    return this.http.get(environment.apiUrl+"InvoiceMasters/forReport?id="+InvoiceMasterId);
  }

  getPurchaseOthers(){
    return this.http.get(environment.apiUrl+"InvoiceMasters/getPurchaseOthers")
  }


}
