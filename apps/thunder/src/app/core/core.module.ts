import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth';
import { HttpModule } from './http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, HttpModule],
})
export class CoreModule {}
