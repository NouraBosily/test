import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentersService } from '../../shared/centers.service';
import { DevicesService } from '../../shared/devices.service';

@Component({
  selector: 'ngx-edit-mangs',
  templateUrl: './edit-mangs.component.html',
  styleUrls: ['./edit-mangs.component.scss']
})
export class EditMangsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    public service: CentersService,
    private devicesService: DevicesService,

  ) {
  }
  mangForm: FormGroup;
  sectorID;
  InitializeLogin() {
    this.mangForm = this.fb.group({
      ID: ["0", Validators.required],
      sec: ["", Validators.required],
      cent: ["", Validators.required],
      mang: ["", Validators.required],
      mang1: ["", Validators.required],
      mang2: ["", Validators.required],
      space: ["", Validators.required],
      name: ["", Validators.required],
      cod: ["", Validators.required],
      del: [""],
      Field10: [""],
      Sectors1ID: [""],
      Centers1ID: [""],
      MangmentsID:[""],
      Mangments1ID:[""],
      Structure: ["", Validators.required],
    })
  }
  type;
  id;
  sections:any[];
  ngOnInit() {
    this.type = this.activeRoute.snapshot.paramMap.get('type');
    this.id = this.activeRoute.snapshot.paramMap.get('ID');
    if (this.id != null && this.type != null) {
      //this.InitializeLogin();

      if (this.type == 1) {
       this.sections = [{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ]
        this.mangForm = this.fb.group({
          ID: ["0", Validators.required],
          sec: ["", Validators.required],
          cent: ["", Validators.required],
          mang: ["", Validators.required],
          mang1: ["", Validators.required],
          mang2: ["", Validators.required],
          space: ["", Validators.required],
          name: ["", Validators.required],
          cod: ["", Validators.required],
          del: [""],
          Field10: [""],
          Sectors1ID: [""],
          Structure: ["", Validators.required],
          flag:[""],
          SectionId:[""]
        })
        this.service.getCenters1ByCenterID(this.id).subscribe((res: any) => {
          let ff=this.mangForm.controls["Structure"].value.split('/',2)
          this.mangForm.setValue({
            ID: res.ID,
            sec: res.sec,
            cent: res.cent,
            mang: res.mang,
            mang1: res.mang1,
            mang2: res.mang2,
            space: res.space,
            name: res.name,
            cod: res.cod,
            del: res.del,
            Field10: res.Field10,
            Sectors1ID: res.Sectors1ID,
            Structure: res.Structure,
            flag:"",
            SectionId:res.sec

          });
        });
      }else if (this.type == 2) {
       
        this.mangForm = this.fb.group({
          ID: ["0", Validators.required],
          sec: ["", Validators.required],
          cent: ["", Validators.required],
          mang: ["", Validators.required],
          mang1: ["", Validators.required],
          mang2: ["", Validators.required],
          space: ["", Validators.required],
          name: ["", Validators.required],
          cod: ["", Validators.required],
          del: [""],
          Field10: [""],
          flag:[""],

          Centers1ID: [""],
          Structure: ["", Validators.required],
        })
        this.service.GetMangmentsByID(this.id).subscribe((res: any) => {
          this.mangForm.setValue({
            ID: res.ID,
            sec: res.sec,
            cent: res.cent,
            mang: res.mang,
            mang1: res.mang1,
            mang2: res.mang2,
            space: res.space,
            name: res.name,
            cod: res.cod,
            del: res.del,
            Field10: res.Field10,
            Centers1ID: res.Centers1ID,
            Structure: res.Structure,
            flag:""
          });
        });
      }else if (this.type == 3) {
        this.mangForm = this.fb.group({
          ID: ["0", Validators.required],
          sec: ["", Validators.required],
          cent: ["", Validators.required],
          mang: ["", Validators.required],
          mang1: ["", Validators.required],
          mang2: ["", Validators.required],
          space: ["", Validators.required],
          name: ["", Validators.required],
          cod: ["", Validators.required],
          del: [""],
          Field10: [""],
          MangmentsID:[""],
          flag:[""],
          Structure: ["", Validators.required],
        })
        this.service.GetMangments1ByID(this.id).subscribe((res: any) => {
          this.mangForm.setValue({
            ID: res.ID,
            sec: res.sec,
            cent: res.cent,
            mang: res.mang,
            mang1: res.mang1,
            mang2: res.mang2,
            space: res.space,
            name: res.name,
            cod: res.cod,
            del: res.del,
            Field10: res.Field10,
            MangmentsID: res.MangmentsID,
            Structure: res.Structure,
            flag:""
          });
        });
      }else if (this.type == 4) {
        this.mangForm = this.fb.group({
          ID: ["0", Validators.required],
          sec: ["", Validators.required],
          cent: ["", Validators.required],
          mang: ["", Validators.required],
          mang1: ["", Validators.required],
          mang2: ["", Validators.required],
          space: ["", Validators.required],
          name: ["", Validators.required],
          cod: ["", Validators.required],
          del: [""],
          Field10: [""],
          Mangments1ID:[""],
          flag:[""],
          Structure: ["", Validators.required],
        })
        this.service.GetMangments2ByID(this.id).subscribe((res: any) => {
          this.mangForm.setValue({
            ID: res.ID,
            sec: res.sec,
            cent: res.cent,
            mang: res.mang,
            mang1: res.mang1,
            mang2: res.mang2,
            space: res.space,
            name: res.name,
            cod: res.cod,
            del: res.del,
            Field10: res.Field10,
            Mangments1ID: res.Mangments1ID,
            Structure: res.Structure,
            flag:""
          });
        });
      }



    }
  }
  get f() {
    return this.mangForm.controls;
  }
  ctrlForSections;
  onchangeSections(ctrl) {    
    this.ctrlForSections=ctrl;
    //console.log(this.sectorID)
  }

  saveMang(){
    if(this.type == 1){
      //subString('kjsksjk',2)
      //(this.mangForm.controls[""].value)
      let structureArray=this.mangForm.controls["Structure"].value.split('/',2)
      console.log(structureArray[0])
      console.log(structureArray[1])
      console.log(structureArray)
       this.ctrlForSections.name
       let body={
        ID: this.id,
        sec: this.ctrlForSections.sec,
        cent: this.mangForm.controls["cent"].value,
        mang: this.mangForm.controls["mang"].value,
        mang1: this.mangForm.controls["mang1"].value,
        mang2: this.mangForm.controls["mang2"].value,
        space: this.mangForm.controls["space"].value,
        name: this.mangForm.controls["name"].value,
        cod: this.mangForm.controls["cod"].value,
        del: this.mangForm.controls["del"].value,
        Field10: this.mangForm.controls["Field10"].value,
        Sectors1ID: this.ctrlForSections.id,
        Structure:structureArray[0] +'/'+this.ctrlForSections.name,
        flag:this.mangForm.controls["flag"].value,
        SectionId:this.mangForm.controls["SectionId"].value
       }
       console.log(body)
      /*this.mangForm.patchValue({
        sec:this.ctrlForSections.sec,
        Sectors1ID:this.ctrlForSections.id,
        Structure:this.ctrlForSections.name

      })*/
      this.service.putCenters1(this.id,body).subscribe((res: any) => {
        console.log(res)
      });
    }
  }
}
