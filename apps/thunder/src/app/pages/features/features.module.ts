import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [CommonModule, ComponentsModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
