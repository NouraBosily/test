import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { AuthGuard } from '../auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AllManifestComponent } from './all-manifest/all-manifest.component';
import { SubAvailableManifestsComponent } from './sub-available-manifests/sub-available-manifests.component';
import { ManifestDetailsComponent } from './manifest-details/manifest-details.component';
import { SubDetailsComponent } from './sub-details/sub-details.component';
import { ManifestBolsComponent } from './manifest-bols/manifest-bols.component';
import { BolDetailsComponent } from './bol-details/bol-details.component';
import { BolItemsComponent } from './bol-items/bol-items.component';
import { BolItemDetailsComponent } from './bol-item-details/bol-item-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MakrsComponent } from './makrs/makrs.component';
import { CreateMarkComponent } from './create-mark/create-mark.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { TreeComponent } from './tree/tree.component';
import { DevicesMangsComponent } from './devices-mangs/devices-mangs.component';
import { ComputersComponent } from './computers/computers.component';
import { CreateDeviceChildComponent } from './create-device-child/create-device-child.component';
import { ReportsComponent } from './reports/reports.component';
import { TestTreeComponent } from './test-tree/test-tree.component';
import { ReportDevicesWithDateComponent } from './report-devices-with-date/report-devices-with-date.component';
import { ReportmangementsNotHaveDevicesComponent } from './reportmangements-not-have-devices/reportmangements-not-have-devices.component';
import { CreateManagementComponent } from './create-management/create-management.component';
import { ReportsNeedsComponent } from './reports-needs/reports-needs.component';
import { OrderneedsComponent } from './orderneeds/orderneeds.component';
import { CreateneedsComponent } from './createneeds/createneeds.component';
import { ReportsCountComponent } from './reports-count/reports-count.component';
import { AchievmentsComponent } from './achievments/achievments.component';
import { AchievmentChildComponent } from './achievment-child/achievment-child.component';
import { CreateCenterComponent } from './create-center/create-center.component';
import { EditMangsComponent } from './edit-mangs/edit-mangs.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'availableusers',
      component: TestComponent
    },
    {
      path: 'userform/add', component: CreateUserComponent
    },
    {
      path: 'userform/edit/:id', component: CreateUserComponent
    },
    {
      path: 'availablemarks',
      component: MakrsComponent
    },
    {
      path: 'markform/add', component: CreateMarkComponent
    },
    {
      path: 'markform/edit/:id', component: CreateMarkComponent
    },
    {
      path: 'availabldevicesmangs',
      component: DevicesMangsComponent
    },

    {
      path: 'devicesmangsform/add', component: CreateDeviceComponent
    },
    {
      path: 'devicesmangsform/edit/:id/:code', component: CreateDeviceComponent
    },
    {
      path: 'devices',
      component: CreateDeviceComponent
    },
    {
      path: 'computers/:serial/:type/:code',
      component: ComputersComponent
    },
    {
      path: 'devicechild/add/:serial/:code/:type',
      component: CreateDeviceChildComponent
    },
    {
      path: 'devicechild/edit/:id/:code/:type',
      component: CreateDeviceChildComponent
    },
    {
      path: 'reports',
      component: ReportsComponent
    },
    {
      path: 'reportsdate',
      component: ReportDevicesWithDateComponent
    }
    ,
    {
      path: 'reports2',
      component: ReportmangementsNotHaveDevicesComponent
    },
    {
      path: 'reportsneeds',
      component: ReportsNeedsComponent
    },
    {
      path: 'reportssectorscount',
      component: ReportsCountComponent
    },
    {
      path: 'orderneeds/:serial/:code',
      component: OrderneedsComponent
    },
    {
      path: 'create-orderneeds/add/:deviceid/:code',
      component: CreateneedsComponent
    },
    {
      path: 'create-orderneeds/edit/:orderId/:deviceid/:code',
      component: CreateneedsComponent
    },
    {
      path: 'achievments/:orderId/:serial/:code/:orderNeedsId/:type',
      component: AchievmentsComponent
    },
    {
      path: 'achievments-child/edit/:Id/:OrderDetailsID/:serial/:code/:orderNeedsId/:type',
      component: AchievmentChildComponent
    },
    {
      path: 'achievments-child/add/:OrderDetailsID/:serial/:code/:orderNeedsId/:type',
      component: AchievmentChildComponent
    },
    {
      path: 'create-management',
      component: CreateManagementComponent
    },
    {
      path: 'create-center/add',
      component: CreateCenterComponent
    },
    {
      path: 'edit-management/:ID/:type',
      component: EditMangsComponent
    },
    {
      path:'tree',component:TreeComponent
    },
    {
      path:'test-tree',component:TestTreeComponent
    },
    {
      path: 'forbidden',
      component: ForbiddenComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'sub',
      component: SubAvailableManifestsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'sub-details/:MNFSTIsn/:DDBIdentification',
      component: SubDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'details/:MNFSTIsn/:DDBIdentification',
      component: ManifestDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'bols/:MNFSTIsn/:DDBIdentification',
      component: ManifestBolsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'bol-details/:DDBIdentification/:BOLIsn',
      component: BolDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'bol-items/:DDBIdentification/:BOLIsn',
      component: BolItemsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'bol-item-details/:DDBIdentification/:BOLIIsn',
      component: BolItemDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '',
      redirectTo: 'availableusers',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule {
}
