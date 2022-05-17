import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarksService } from '../../shared/marks.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'ngx-create-mark',
  templateUrl: './create-mark.component.html',
  styleUrls: ['./create-mark.component.scss']
})
export class CreateMarkComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
    public service: MarksService,
    private dialog: MatDialog,
    private route: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    //private serviceUnLoadingPort: UnloadingPortService
  ) { }
 
  id;
  submitted: boolean = false;
  markForm: FormGroup;
  devicesTypeArray = [
    { id: 1, name: 'كمبيوتر' },
    { id: 2, name: 'طابعة' },
    { id: 3, name: 'ماكينة تصوير' },
    { id: 4, name: 'ماسح ضوئي' },
    { id: 5, name: 'فاكس' },
    { id: 6, name: 'شاشة' },
    { id: 7, name: 'أخرى' },

  ];

  InitializeLogin() {
    this.markForm = this.fb.group({
      ID:["0",Validators.required],
      //code:["",Validators.required],
      devicemark: ["", Validators.required],
      devicecategory:["", Validators.required],
    })
  }
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.InitializeLogin();
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.InitializeLogin();
    } else {
      let id = this.activeRoute.snapshot.paramMap.get("id");
      this.service.getMark(parseInt(this.id)).subscribe((res: any) => {
        this.markForm.setValue({
          ID:id,
          //code: res.code,
          devicemark: res.devicemark,   
          devicecategory:res.devicecategory       
        });
      });
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.markForm.invalid) {

      console.log(this.markForm.value);
      return;
    }

    else {
      if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.markForm.value)
        this.service.insertMark(this.markForm.value).subscribe(res => {
          console.log(this.markForm.value)
          this.notificationService.success('تم الإدراج بنجاح');
          this.route.navigate(['/pages/availablemarks']);

        },
        err => {
          if (err.status == 400) {
            alert('تم ادراج هذه الماركة من قبل');
          }

          else {
            console.log(err);
          }
        }
        );
      } else {
        this.service.UpdateMark(this.id,this.markForm.value).subscribe(res => {
          this.notificationService.success('تم التعديل بنجاح');

        },
        err => {
          if (err.status == 400) {
            alert(' تم ادراج هذه الماركة من قبل من فضلك قم بتغيير اسم الماركة او الفئة');
          }

          else {
            console.log(err);
          }
        }
        
        );
      }
    }
  }

  goToAllDevices(){
    this.route.navigate(['/pages/availablemarks']);

  }
  get f() {
    return this.markForm.controls;
  }


}
