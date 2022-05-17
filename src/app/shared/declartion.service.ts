import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DeclartionService {
  
  constructor(private fb:FormBuilder,private http:HttpClient) { }

 groupForm=this.fb.group({
     DCRTNIsn:["0",Validators.required],
    DDBIdentification:["1",Validators.required],
    
    DCRTNMainType:["2",Validators.required],
    DCRTNYear:[new Date().getFullYear(),Validators.required],
    DCRTNRegBook:["1",Validators.required],
    APPLYDDBIdentification:["1",Validators.required],
    APPLYCDLRIsn:["201",Validators.required],
    IMPRTRDDBIdentification:["1",Validators.required],
    IMPRTRCDLRIsn:["201",Validators.required],
    DCRTNDestinationCUSTIsn:["",Validators.required],
    CUSTIsn:["",Validators.required],
    CCPXIsn:["",Validators.required],
    CSVPCode:["",Validators.required],
    CCTIsn:["",Validators.required],
    DCRTNPaymentTypeCode:["",Validators.required],
    CSYSCode:["",Validators.required],
    DCRTNCrs:["1",Validators.required],
    //BOLLoadingDate:[new Date(),Validators.required],
    //CSYSCode:["",Validators.required],CSYSCode
    //CurrentCSYSCode:["",Validators.required],
  
   // BOLType:["2",Validators.required],
  //  BOLDeliveryType:["",Validators.required],
   // BOLConsolidationCode:["1",Validators.required],
    Rdl:["1",Validators.required],
    Rsc:["0",Validators.required],
    DCRTNFinishCUSTIsn:["",Validators.required],
    //UFDDBIdentification:["0"],
    UFIsn:[""],
    DCRTNDataEntryDate:[new Date(),Validators.required],
    productSpecification: this.fb.array([
      this.fb.group({
        STDSPIsn:[""],
        DDBIdentification:[""],
        STDSPArabicName:[""],
        SUBJCode:[""],
        PSSubjectIsn:[""],
        PSItemNumber:[""],
        PSSpecification:["",Validators.required]
      })
    ])
  })

  getAllDeclarations(){
    return this.http.get(environment.apiUrl+"declarationexp/1/201");
  }

  getOneDeclarations(id,isn){
     return this.http.get(environment.apiUrl+"declarationbyexp/"+id+"/"+isn)
  }

  getOneBillOfLeading(id,isn){
    return this.http.get(environment.apiUrl+"billoflading/"+id+"/"+isn)
  }

postBillOfLeading(body){
 return this.http.post(environment.apiUrl+"addbilloflading",body)
}

postDeclaration(body){
  return this.http.post(environment.apiUrl+"adddeclaration",body)
}
deleteBillOfLeading(id,isn){
  return this.http.get(environment.apiUrl+"deletebilloflading/"+id+"/"+isn)
}
deleteProductSpecification(drtnid,drtnisn){
  return this.http.get(environment.apiUrl+"DeleteProductSpecification/"+drtnid+"/"+drtnisn);
}
deleteDeclaration(id,isn){
  return this.http.get(environment.apiUrl+"deletedeclaration/"+id+"/"+isn)
}

editBillOfLeading(body){
  return this.http.post(environment.apiUrl+"editbilloflading",body)
}

editDeclaration(body){
  return this.http.post(environment.apiUrl+"editdeclaration",body)
}

postProductSpecification(body){
return this.http.post(environment.apiUrl+"ADDProductSpecification",body)
}

getForEditProductSpecifications(id,isn){
  return this.http.get(environment.apiUrl+"GetProductSpecifications/"+id+"/"+isn)
}
putProductSpecifications(body,id,isn){
  return this.http.post(environment.apiUrl+"editProductSpecification/"+id+"/"+isn,body)
}

}
