import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';

// Components

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgOtpInputModule,
    SharedModule
  ]
})
export class DashboardModule { }
