import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
  orderForm:FormGroup=this.fb.group({
    ExportOrderMasterId:["0",Validators.required],
    ExportOrderMasterCode:["0",Validators.required],
    TreaterId:["",Validators.required],
    DocTypeId:["",Validators.required],
    NetTotalWeight:["",[Validators.required,Validators.min(0)]],
    TotalBucket:["",[Validators.required,Validators.min(0)]],
    TotalKilo:["",[Validators.required,Validators.min(0)]],
    TotalOpen:["",[Validators.required,Validators.min(0)]],
    TotalQuarsRummy:["",[Validators.required,Validators.min(0)]],
    TotalKiloQuarsRummy:["",[Validators.required,Validators.min(0)]],
    TotalCartonsRummy:["",[Validators.required,Validators.min(0)]],
    TotalKiloCartonsRummy:["",[Validators.required,Validators.min(0)]],
    TotalMissions:["",[Validators.required,Validators.min(0)]],
    TotalKiloLeaves:["",Validators.required],
    TotalCarton6:["",Validators.required],
    TotalCarton12:["",Validators.required],
    TotalGardel:["",Validators.required],
    TotalOthers:["",Validators.required]
  });


  WhiteCheeseDetailList:any[]=[];
  RummyDetailList:any[]=[];
  MissionDetailList:any[]=[];
  leaveDetailList:any[]=[];
  OtherDetailList:any[]=[];

  rummyOrderDetailForm:FormGroup=this.fb.group({
    ExportOrderDetailId:["0"],
    ExportOrderMasterId:["0"],
    StoreId:["",Validators.required],
    StoreDesc:["",Validators.required],
    GroupId:["",Validators.required],
    GroupDesc:["",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    ItemsStandardId:["",Validators.required],
    ItemsStandardDesc:["",Validators.required],
    Amount:["",Validators.required] ,
    Weight:["",Validators.required],
    CheckedAmount:[""],
    CheckedWeight:[""]
  })

  WhiteCheeseOrderDetailsForm:FormGroup=this.fb.group({
    ExportOrderDetailId:["0"],
    ExportOrderMasterId:["0"],
    PatchNumber:["",[Validators.required,Validators.min(0)]],
    StoreId:["",Validators.required],
    StoreDesc:["",Validators.required],
    GroupId:["",Validators.required],
    GroupDesc:["",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    CheckedQuantity:[""],
    ItemsStandardId:["",Validators.required],
    ItemsStandardDesc:["",Validators.required],
    CurrentRecivedQuantity:["",Validators.required]

  })

  leaveDetailForm:FormGroup=this.fb.group({
    ExportOrderDetailId:["0"],
    ExportOrderMasterId:["0"],
    
    StoreId:["",Validators.required],
    StoreDesc:["",Validators.required],
    ItemsStandardId:["",Validators.required],
    ItemsStandardDesc:["",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
    CheckedQuantity:[""],
    CurrentRecivedQuantity:["",Validators.required]
  })

  MissionDetailForm:FormGroup=this.fb.group({
    ExportOrderDetailId:["0"],
    ExportOrderMasterId:["0"],
    StoreId:["",Validators.required],
    StoreDesc:["",Validators.required],
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
   
    CheckedQuantity:[""],
    ItemUnit:["",Validators.required],
    CurrentRecivedQuantity:["",Validators.required]
  })


  OtherDetailForm:FormGroup=this.fb.group({
    ExportOrderDetailId:["0"],
    ExportOrderMasterId:["0"],
    StoreId:["1",Validators.required],
  
    ItemId:["",Validators.required],
    ItemDesc:["",Validators.required],
   
    CheckedQuantity:[""],
    ItemUnit:["",Validators.required],
    CurrentRecivedQuantity:["",Validators.required]
  })





  orderStoreForm:FormGroup=this.fb.group({
    StoreId:["",Validators.required],
    ExportOrderMasterId:["",Validators.required]
  })



  invoiceSellForm:FormGroup=this.fb.group({
    InvoiceSellMasterId:["0",Validators.required],
    SafeId:["",Validators.required],
    DocTypeId:["",Validators.required],
    TreaterId:["",Validators.required],
    ExportOrderMasterId:["",Validators.required],
    TotalWhiteCheese:["",[Validators.required,Validators.min(0)]],
    TotalRummy:["",[Validators.required,Validators.min(0)]],
    TotalMission:["",[Validators.required,Validators.min(0)]],
    TotalLeave:["",[Validators.required,Validators.min(0)]],
    TotalOthers:["",[Validators.required,Validators.min(0)]],
    AddedValue:["0",[Validators.required,Validators.min(0)]],
    TotalValue:["",Validators.required],
    CustomsInvoiceMasterId:[""],
    IsExportPrice:["",Validators.required]
  })

  WhiteCheeseSellsList:any[]=[];
  RummySellsList:any[]=[];
  MissionSellsList:any[]=[];
  WhiteCheeseDetailsSalesForm:FormGroup=this.fb.group({
    InvoiceDetailSellId:["",Validators.required],
    InvoiceSellMasterId:["",Validators.required],
    PatchNumber:[{value: '', disabled: true},Validators.required],
    StoreId:[{value: '', disabled: true}],
    StoreDesc:[{value: '', disabled: true}],
   ItemId:[{value: '', disabled: true},Validators.required],
    CurrentRecivedQuantity:[{value: '', disabled: true},Validators.required],
    ItemDesc:[{value: '', disabled: true},Validators.required],
    GroupDesc:[{value: '', disabled: true},Validators.required],
    GroupId:[{value: '', disabled: true},Validators.required],
  SellPrice:["",Validators.required],
  ItemsStandardId:[{value:'',disabled:true},Validators.required],
  ItemsStandardDesc:["",Validators.required],
    TotalValue:[{value: '', disabled: true},Validators.required]
  })


  RummySalesForm:FormGroup=this.fb.group({
    InvoiceDetailSellId:["",Validators.required],
    InvoiceSellMasterId:["",Validators.required],
  
    StoreId:[{value: '', disabled: true}],
    StoreDesc:[{value: '', disabled: true}],
   ItemId:[{value: '', disabled: true},Validators.required],
   Amount:[{value:'',disabled:true},Validators.required],
    Weight:[{value: '', disabled: true},Validators.required],
    ItemDesc:[{value: '', disabled: true},Validators.required],
    GroupDesc:[{value: '', disabled: true},Validators.required],
    GroupId:[{value: '', disabled: true},Validators.required],
  SellPrice:["",Validators.required],
  ItemsStandardId:[{value:'',disabled:true},Validators.required],
  ItemsStandardDesc:["",Validators.required],
    TotalValue:[{value: '', disabled: true},Validators.required]
  })

  LeaveSalesForm:FormGroup=this.fb.group({
    InvoiceDetailSellId:["",Validators.required],
    InvoiceSellMasterId:["",Validators.required],
  
    StoreId:[{value: '', disabled: true}],
    StoreDesc:[{value: '', disabled: true}],
   ItemId:[{value: '', disabled: true},Validators.required],
   CurrentRecivedQuantity:[{value: '', disabled: true},Validators.required],
    ItemDesc:[{value: '', disabled: true},Validators.required],
   
  SellPrice:["",Validators.required],
  ItemsStandardId:[{value:'',disabled:true},Validators.required],
  ItemsStandardDesc:["",Validators.required],
    TotalValue:[{value: '', disabled: true},Validators.required]
  })

  missionSalesForm:FormGroup=this.fb.group({
    InvoiceDetailSellId:["",Validators.required],
    InvoiceSellMasterId:["",Validators.required],
    StoreId:[{value: '', disabled: true}],
    StoreDesc:[{value: '', disabled: true}],
   ItemId:[{value: '', disabled: true},Validators.required],
    CurrentRecivedQuantity:[{value: '', disabled: true},Validators.required],
    ItemDesc:[{value: '', disabled: true},Validators.required],

  SellPrice:["",Validators.required],
    TotalValue:[{value: '', disabled: true},Validators.required]
  })


  otherSalesForm:FormGroup=this.fb.group({
    InvoiceDetailSellId:["",Validators.required],
    InvoiceSellMasterId:["",Validators.required],
    StoreId:[1,Validators.required],

   ItemId:[{value: '', disabled: true},Validators.required],
    CurrentRecivedQuantity:[{value: '', disabled: true},Validators.required],
    ItemDesc:[{value: '', disabled: true},Validators.required],

  SellPrice:["",Validators.required],
    TotalValue:[{value: '', disabled: true},Validators.required]
  })
getInvoiceSells(ExportOrderMasterId){
  return this.http.get(environment.apiUrl+"InvoiceSellMasters/exportOrderMaster?id="+ExportOrderMasterId);
}


postInvoiceSells(body){
return this.http.post(environment.apiUrl+"InvoiceSellMasters",body);
}

  postOrder(body){
    return this.http.post(environment.apiUrl+"ExportOrderMasters",body)
  }

  putOrder(body)
  {
    return this.http.put(environment.apiUrl+"ExportOrderMasters",body)
  }
  
  RegisterQuality(ExportOrderMasterId)
  {
   return this.http.delete(environment.apiUrl+"ExportOrderMasters/RegisterQuality?id="+ExportOrderMasterId);
  }



  registerAdmin(ExportOrderMasterId){
    return this.http.delete(environment.apiUrl+"ExportOrderMasters/RegisterAdmin?id="+ExportOrderMasterId);
  }


  RegisterWharehouse(ExportOrderMasterId){
    return this.http.delete(environment.apiUrl+"ExportOrderMasters/RegisterWharehouse?id="+ExportOrderMasterId);
  }

  RegisterAccounter(ExportOrderMasterId){
    return this.http.delete(environment.apiUrl+"ExportOrderMasters/RegisterAccounter?id="+ExportOrderMasterId)
  }

  getAllOrders(type,DocTypeId){
    if(type=="salesQuality")
    {
    return this.http.get(environment.apiUrl+"ExportOrderMasters/forQuality?id="+DocTypeId);
    }
   else  if(type=="salesAdmin")
    {
      return this.http.get(environment.apiUrl+"ExportOrderMasters/forAdmin?id="+DocTypeId);
    }
    else if(type=="salesWharehouse")
    {
      return this.http.get(environment.apiUrl+"ExportOrderMasters/forWharehouse?id="+DocTypeId);
    }
    else if(type=="salesAccounter")
    {
      return this.http.get(environment.apiUrl+"ExportOrderMasters/forAccounter?id="+DocTypeId);
    }
   
  }

  getOrderForReport(id){
    return this.http.get(environment.apiUrl+"ExportOrderMasters/Reports?id="+id);
  }

  

  getInvoiceForReport(id){
    return this.http.get(environment.apiUrl+"InvoiceSellMasters/forReport?id="+id);
  }
}
