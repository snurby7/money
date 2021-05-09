import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnumToArrayPipe } from './pipes/enum-value.pipe';

@NgModule({
  declarations: [EnumToArrayPipe],
  exports: [EnumToArrayPipe],
  imports: [CommonModule],
})
export class SharedModule {}
