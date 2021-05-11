import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubBaseRoutingModule } from './hub-base-routing.module';
import { HubBaseComponent } from './hub-base.component';
import { CategoryModule } from '../category/category.module';


@NgModule({
  declarations: [HubBaseComponent],
  imports: [
    CommonModule,
    HubBaseRoutingModule,
    CategoryModule
  ]
})
export class HubBaseModule { }
