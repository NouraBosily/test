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
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ar';
import 'moment/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AttendanceComponent } from './attendance/attendance.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';


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
    AttendanceComponent,
    Test1Component,
    Test2Component
    
  ],
  
  entryComponents:[
    
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
