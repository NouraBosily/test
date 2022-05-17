import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { ChartsModule } from 'ng2-charts';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { AngularInterceptor, DEFAULT_TIMEOUT } from './AngularInterceptor/angular-interceptor';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AllManifestComponent } from './all-manifest/all-manifest.component';
import { SubAvailableManifestsComponent } from './sub-available-manifests/sub-available-manifests.component';
import { ManifestDetailsComponent } from './manifest-details/manifest-details.component';
import { SubDetailsComponent } from './sub-details/sub-details.component';
import { ManifestBolsComponent } from './manifest-bols/manifest-bols.component';
import { BolDetailsComponent } from './bol-details/bol-details.component';
import { BolItemsComponent } from './bol-items/bol-items.component';
import { BolItemDetailsComponent } from './bol-item-details/bol-item-details.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MakrsComponent } from './makrs/makrs.component';
import { CreateMarkComponent } from './create-mark/create-mark.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TreeComponent } from './tree/tree.component';
import { ComputersComponent } from './computers/computers.component';
import { DevicesMangsComponent } from './devices-mangs/devices-mangs.component';
import { CreateDeviceChildComponent } from './create-device-child/create-device-child.component';
import { ReportsComponent } from './reports/reports.component';
import { TestTreeComponent } from './test-tree/test-tree.component';
import { DetailsReportComponent } from './details-report/details-report.component';
import { ReportDevicesWithDateComponent } from './report-devices-with-date/report-devices-with-date.component';
import { ReportmangementsNotHaveDevicesComponent } from './reportmangements-not-have-devices/reportmangements-not-have-devices.component';
import { CreateManagementComponent } from './create-management/create-management.component';
import { ReportsNeedsComponent } from './reports-needs/reports-needs.component';
import { OrderneedsComponent } from './orderneeds/orderneeds.component';
import { CreateneedsComponent } from './createneeds/createneeds.component';
import { CreateneedsDetailsComponent } from './createneeds-details/createneeds-details.component';
import { ReportsCountComponent } from './reports-count/reports-count.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ar';
import 'moment/locale/fr';
import { AchievmentChildComponent } from './achievment-child/achievment-child.component';
import { AchievmentsComponent } from './achievments/achievments.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateCenterComponent } from './create-center/create-center.component';
import { EditMangsComponent } from './edit-mangs/edit-mangs.component';
import { TestComponent } from './test/test.component';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgSelectModule,
    NgxPrintModule,
    NgxMatFileInputModule,
   MatDatepickerModule, MatMomentDateModule,

  ],
  declarations: [
    PagesComponent,
    ForbiddenComponent,
    AllManifestComponent,
    SubAvailableManifestsComponent,
    ManifestDetailsComponent,
    SubDetailsComponent,
    ManifestBolsComponent,
    BolDetailsComponent,
    BolItemsComponent,
    BolItemDetailsComponent,
    AllUsersComponent,
    CreateUserComponent,
    MakrsComponent,
    CreateMarkComponent,
    CreateDeviceComponent,
    DepartmentsComponent,
    TreeComponent,
    ComputersComponent,
    DevicesMangsComponent,
    CreateDeviceChildComponent,
    ReportsComponent,
    TestTreeComponent,
    DetailsReportComponent,
    ReportDevicesWithDateComponent,
    ReportmangementsNotHaveDevicesComponent,
    CreateManagementComponent,
    ReportsNeedsComponent,
    OrderneedsComponent,
    CreateneedsComponent,
    CreateneedsDetailsComponent,
    ReportsCountComponent,
    AchievmentsComponent,
    AchievmentChildComponent,
    CreateCenterComponent,
    EditMangsComponent,
    TestComponent,
    AttendanceComponent
    
  ],
  
  entryComponents:[
    DepartmentsComponent,
    ComputersComponent,
    DetailsReportComponent,
    CreateneedsDetailsComponent,
    CreateCenterComponent
    //AchievmentComponent
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AngularInterceptor, multi: true }],
  {provide: MAT_DATE_LOCALE, useValue: 'ar'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.

    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  [{ provide: DEFAULT_TIMEOUT, useValue: 3000000 }]]
})
export class PagesModule {
}
