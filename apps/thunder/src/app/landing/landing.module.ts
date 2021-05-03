import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule, LayoutModule, LandingRoutingModule],
  declarations: [LandingComponent],
})
export class LandingModule {}
