import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ExistingUserComponent } from './existing-user/existing-user.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    GettingStartedComponent,
    NewUserComponent,
    ExistingUserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    GettingStartedRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class GettingStartedModule {}
