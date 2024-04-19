import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';

// Guards
import { RecipesGuard, ProfileGuard } from 'src/app/guards';

// Components

import { ProfileComponent } from './profile/profile.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [RecipesGuard]
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    RecipesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgOtpInputModule,
    SharedModule
  ]
})
export class DashboardModule { }
