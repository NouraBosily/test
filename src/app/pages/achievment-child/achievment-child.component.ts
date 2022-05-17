import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { OrderNeedsService } from '../../shared/orderneeds.service';
import { OrderNeedsItem } from '../model/OrderNeedsItem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { Mark } from '../model/Mark';
import { AchievmentService } from '../../shared/achievment.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'ngx-achievment-child',
  templateUrl: './achievment-child.component.html',
  styleUrls: ['./achievment-child.component.scss']
})
export class AchievmentChildComponent implements OnInit {

  isValid: boolean = true;
  achievmentChildForm: FormGroup;
  submitted;
  MarksArray;
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    //{ id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    //{ id: 4, name: 'لا يعمل قديم' }
  ]

  deviceTypeArray = [
    { id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'الطابعات' },
    { id: 3, name: 'ماكينات التصوير' },
    { id: 4, name: 'الماسح الضوئي' },
    { id: 5, name: 'أجهزة الفاكس' },
    { id: 6, name: 'الشاشات' },
    { id: 7, name: 'أخرى' }
  ];
  orderDetailsID;
  achievmentID;
  serial;
  code;
  orderNeedsId;
  type1;
  constructor(
    private activeRoute: ActivatedRoute,
    public service: AchievmentService,
    public marksService: MarksService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: Router,
    private _adapter: DateAdapter<any>,
    public datepipe: DatePipe,

  ) { }

  ngOnInit() {
    this.InitializeLogin();
  }
  datechild;
  InitializeLogin() {

    this.achievmentID = this.activeRoute.snapshot.paramMap.get("Id");
    this.orderDetailsID = this.activeRoute.snapshot.paramMap.get("OrderDetailsID");
    this.serial = this.activeRoute.snapshot.paramMap.get("serial");
    this.code = this.activeRoute.snapshot.paramMap.get("code");
    this.orderNeedsId = this.activeRoute.snapshot.paramMap.get("orderNeedsId");
    this.type1 = this.activeRoute.snapshot.paramMap.get("type");

    this._adapter.setLocale('ar');
    this.marksService.getAllMarks().subscribe((res: Mark[]) => {
      this.MarksArray = res;
    })

    if (this.achievmentID == null) {
      console.log('this.data.orderItemIndex == null')
      this.achievmentChildForm = this.fb.group({
        ID: [""],
        AchievementCase: ["0", Validators.required],
        NumberOf: ["", Validators.required],
        AchievementDeviceModel: [""],
        AchievementDeviceType: [this.type1],
        Mark:["", Validators.required],
        OrderNeedsDetailsID: [this.orderDetailsID],
        Flag:[""],
        devicedateAchievment:[""]
      })
    }
    else {
     console.log(this.achievmentID);
      this.service.getAchievmentByID(this.achievmentID).subscribe((res: any) => {
        this.datechild =res.devicedateAchievment;
        console.log(this.datechild)
        this.numberof=res.NumberOf;
        this.achievmentChildForm = this.fb.group({
          ID: [""],
          AchievementCase: ["0", Validators.required],
          NumberOf: ["", Validators.required],
          AchievementDeviceModel: [""],
          AchievementDeviceType: [this.type1],
          Mark:["", Validators.required],
          OrderNeedsDetailsID: [this.orderDetailsID],
          Flag:[""],
          devicedateAchievment:[""]
        });
        console.log(res.devicedateAchievment)
        console.log(res);
        //this.achievmentChildForm.controls["devicedate"].setValue(res.devicedate)

        this.achievmentChildForm.setValue({
          ID: res.ID,
          AchievementCase: res.AchievementCase,
          NumberOf: res.NumberOf,
          AchievementDeviceModel: res.AchievementDeviceModel,
          AchievementDeviceType: this.type1,
          Mark:res.Mark,
          OrderNeedsDetailsID: res.OrderNeedsDetailsID,
          Flag:res.Flag,
          devicedateAchievment: res.devicedateAchievment

        })
        console.log(this.achievmentChildForm.controls["devicedateAchievment"].value)

      });

      /*console.log('this.data.orderItemIndex != null')
      this.achievmentChildForm = this.fb.group({
        ID: ["0", Validators.required],
        Type: ["0"],
        NumberOf: [""],
        AchievementCase: ["0"],
        Achievement: [""],
        AchievementDeviceModel: [""]
      })
      this.achievmentChildForm.controls["ID"].setValue("")
      this.achievmentChildForm.controls["Type"].setValue("")
      this.achievmentChildForm.controls["NumberOf"].setValue("")
      this.achievmentChildForm.controls["OrderNeedsID"].setValue("")*/
      /*if (this.service.orderItems[this.data.orderItemIndex].Achievement == null) {
        this.needsDetailsForm.controls["Achievement"].setValue("0")

      } else {
        this.needsDetailsForm.controls["Achievement"].setValue(this.service.orderItems[this.data.orderItemIndex].Achievement)

      }*/

      //console.log(this.service.orderItems[this.data.orderItemIndex].OrderNeedsID);
      //console.log(this.service.orderItems[this.data.orderItemIndex].ID);
      //console.log(this.service.orderItems[this.data.orderItemIndex].Type);
      //console.log(this.needsDetailsForm.controls["Achievement"].value);

    }
  }
  //this.orderItems = [];
numberof;

  onSubmit() {

    this.submitted = true;
    if (this.achievmentChildForm.invalid) {
      console.log(this.achievmentChildForm.value);
      return;
    }

    else {
      if (this.achievmentID == null) {
        console.log(this.achievmentChildForm.value)
        var body={
          "AchievementCase":this.achievmentChildForm.controls["AchievementCase"].value,
          "NumberOf":this.achievmentChildForm.controls["NumberOf"].value,
          "AchievementDeviceModel":this.achievmentChildForm.controls["AchievementDeviceModel"].value,
  
          "AchievementDeviceType":this.achievmentChildForm.controls["AchievementDeviceType"].value,
          "Mark":this.achievmentChildForm.controls["Mark"].value,
          "OrderNeedsDetailsID":this.achievmentChildForm.controls["OrderNeedsDetailsID"].value,
  "Flag":true,
  "devicedateAchievment":this.achievmentChildForm.controls["devicedateAchievment"].value,
        }
        console.log(body)
        this.service.insertAchievmentChild(this.code,this.serial, body).subscribe((res: any) => {
          console.log(res)
          this.notificationService.success('تم الحفظ بنجاح');
          this.route.navigate(['/pages/achievments-child/edit/' + res.ID +'/'+res.OrderNeedsDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type1]);

        },
        err => {
          if (err.status == 400) {
            if(confirm(err.error.Message)){
              //this.route.navigate(['/pages/achievments-child/edit/' + this.achievmentID +'/'+this.orderDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type1]);
              this.achievmentChildForm.patchValue({
                NumberOf: ""
              })
            }
            //confirm(err.error.Message)
            
            //alert(err.error.Message);
            console.log(err.error.Message)
          }

          else {
            console.log(err);
          }
        });

      } else {
        
        console.log(this.achievmentChildForm.value)
        this.service.UpdateAchievment(this.achievmentID,this.serial, this.achievmentChildForm.value).subscribe((res: any) => {
          console.log(res)
          this.notificationService.success('تم الحفظ بنجاح');
          this.route.navigate(['/pages/achievments-child/edit/' + this.achievmentID +'/'+this.orderDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type1]);
        },
        err => {
          if (err.status == 400) {
            if(confirm(err.error.Message)){
              console.log(err.error.Message);
              this.achievmentChildForm.patchValue({
                NumberOf: this.numberof
              })
              this.route.navigate(['/pages/achievments-child/edit/' + this.achievmentID +'/'+this.orderDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type1]);

            }
            //alert(err.error.Message);
            console.log(err.error.Message)
          }

          else {
            console.log(err);
          }
        });
      }

    }
  }

  backToAllAchievments(){
    this.route.navigate(['/pages/achievments/'+this.orderDetailsID+'/'+this.serial+'/'+this.code+'/'+this.orderNeedsId+'/'+this.type1]);

  }


}
