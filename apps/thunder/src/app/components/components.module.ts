import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BuriedTreasureIconComponent } from './buried-treasure-icon/buried-treasure-icon.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SecureLoginIconComponent } from './secure-login-icon/secure-login-icon.component';

@NgModule({
  declarations: [NavigationBarComponent, BuriedTreasureIconComponent, SecureLoginIconComponent],
  imports: [CommonModule, MatButtonModule, MatToolbarModule, RouterModule],
  exports: [NavigationBarComponent, BuriedTreasureIconComponent, SecureLoginIconComponent],
})
export class ComponentsModule {}
