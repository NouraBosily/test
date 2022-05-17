import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { OrderNeedsService } from '../../shared/orderneeds.service';
import { OrderNeedsItem } from '../model/OrderNeedsItem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../../shared/marks.service';
import { Mark } from '../model/Mark';

@Component({
  selector: 'ngx-createneeds-details',
  templateUrl: './createneeds-details.component.html',
  styleUrls: ['./createneeds-details.component.scss']
})
export class CreateneedsDetailsComponent implements OnInit {

  //needsDetailsForm: OrderNeedsItem;
  //itemList: Item[];
  isValid: boolean = true;
  needsDetailsForm: FormGroup;
  submitted;
  MarksArray;
  printercaseArray = [
    { id: 1, name: 'يعمل جديد' },
    { id: 2, name: 'لا يعمل جديد' },
    { id: 3, name: 'يعمل قديم' },
    { id: 4, name: 'لا يعمل قديم' }]

    deviceTypeArray = [
      { id: 1, name: 'أجهزة كمبيوتر' },
      { id: 2, name: 'الطابعات' },
      { id: 3, name: 'ماكينات التصوير' },
      { id: 4, name: 'الماسح الضوئي' },
      { id: 5, name: 'أجهزة الفاكس' },
      { id: 6, name: 'الشاشات' },
      { id: 7, name: 'أخرى' }
    ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CreateneedsDetailsComponent>,
    public service: OrderNeedsService,
    public marksService:MarksService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: Router,

    ) { }

  ngOnInit() {
    this.InitializeLogin();
    /*this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    else
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);*/
  }
  InitializeLogin() {

    console.log("this.data.orderItemIndex "+ this.data.orderItemIndex)
    console.log("this.data.OrderID "+ this.data.OrderID)
    this.marksService.getAllMarks().subscribe((res: Mark[]) => {
      this.MarksArray = res;
    })
    if (this.data.orderItemIndex == null){

      console.log('this.data.orderItemIndex == null')
    this.needsDetailsForm = this.fb.group({
      ID: ["0", Validators.required],
      //Status:["0"],
      Type:["0"],
      //Mark:["",  Validators.required],
      NumberOf:[""],
      //DeviceModel:[""],
      OrderNeedsID: this.data.OrderID,
      //Achievement:["0"]
    })
    }
  else 
  {
    console.log('this.data.orderItemIndex != null')
    this.needsDetailsForm = this.fb.group({
      ID: ["0", Validators.required],
      //Status:["0"],
      Type:["0"],
      //Mark:["",  Validators.required],
      NumberOf:[""],
      //DeviceModel:[""],
      OrderNeedsID: this.data.OrderID,
      Achievement: ["0"]

    })
    console.log( this.service.orderItems[this.data.orderItemIndex]);
    this.needsDetailsForm.controls["ID"].setValue(this.service.orderItems[this.data.orderItemIndex].ID)
      this.needsDetailsForm.controls["Type"].setValue(this.service.orderItems[this.data.orderItemIndex].Type)
      this.needsDetailsForm.controls["NumberOf"].setValue(this.service.orderItems[this.data.orderItemIndex].NumberOf)
      this.needsDetailsForm.controls["OrderNeedsID"].setValue(this.service.orderItems[this.data.orderItemIndex].OrderNeedsID)
      if(this.service.orderItems[this.data.orderItemIndex].Achievement == null){
        this.needsDetailsForm.controls["Achievement"].setValue("0")

      }else{
        this.needsDetailsForm.controls["Achievement"].setValue(this.service.orderItems[this.data.orderItemIndex].Achievement)

      }

      console.log(this.service.orderItems[this.data.orderItemIndex].OrderNeedsID);
      console.log(this.service.orderItems[this.data.orderItemIndex].ID);
      console.log(this.service.orderItems[this.data.orderItemIndex].Type);
      console.log( this.needsDetailsForm.controls["Achievement"].value);


  }
}
    //this.orderItems = [];
  

  onSubmit() {

    /*if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }*/

    this.submitted = true;
    if (this.needsDetailsForm.invalid) {
      console.log(this.needsDetailsForm.value);
      return;
    }

    else {
      if(this.data.orderItemIndex == null){
        
      //if (this.activeRoute.snapshot.paramMap.get('id') == null) {
        console.log(this.needsDetailsForm.value)
        this.service.orderItems.push(this.needsDetailsForm.value);
        /*this.service.insertOrderNeedsDetails(this.needsDetailsForm.value).subscribe(res => {
          this.notificationService.success('تم الإدراج بنجاح');
          this.route.navigate(['/pages/computers/' + this.deviceid + '/' + this.type + '/' + this.code]);

        }
        );*/
      } else {
        /*this.service.UpdateDevice(this.id, this.userForm.value).subscribe(res => {
          this.notificationService.success('تم التعديل بنجاح');
        });*/
        this.service.orderItems[this.data.orderItemIndex] = this.needsDetailsForm.value;
      }
      this.dialogRef.close();

    }
  }

  
  /*updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }*/

}
