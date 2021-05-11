import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HubBaseComponent } from './hub-base.component';

const routes: Routes = [{ path: '', component: HubBaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubBaseRoutingModule { }
