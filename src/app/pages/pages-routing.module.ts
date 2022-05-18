import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { AuthGuard } from '../auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
   
    {
      path: 'forbidden',
      component: ForbiddenComponent,
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
