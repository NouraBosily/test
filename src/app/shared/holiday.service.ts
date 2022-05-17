import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  holidayForm:FormGroup=this.fb.group({
    OfficialholidayID:["0"],
    HOLIDAYNAME:["",Validators.required],
    FROMDATE:["",Validators.required],
    TODATE:["",Validators.required],
    CRS:[""],
    RSC:[""]

  })

  constructor(private http:HttpClient,private fb:FormBuilder,) { }

  getAllHoliday()
  {
    return this.http.get(environment.apiUrl+"Officialholidays")
  }

  getOneHoliday(OfficialholidayID){
    return this.http.get(environment.apiUrl+"Officialholidays/byId?id="+OfficialholidayID)

  }

  postHoliday(body)
  {
    return this.http.post(environment.apiUrl+"Officialholidays",body);
  }

putHoliday(OfficialholidayID,body){
return this.http.put(environment.apiUrl+"Officialholidays/"+OfficialholidayID,body)
}
  deleteHoliday(OfficialholidayID){
    return this.http.get(environment.apiUrl+"Officialholidays/byOfficialHoliday?OfficialHolidayId="+OfficialholidayID)
  }


}
