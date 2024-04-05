import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { HomeComponent } from './home/home.component';

// Guards
import { LoginGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgOtpInputModule,
    SharedModule
  ]
})
export class MainModule { }
