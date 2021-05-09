import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetHubModule } from './budget-hub/budget-hub.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [],
  imports: [BudgetHubModule, CommonModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
