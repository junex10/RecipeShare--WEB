import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Internal modules

import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/web/pages/main/main.module').then(mod => mod.MainModule)
  },
  {
    path: '',
    loadChildren: () => import('src/app/web/pages/auth/auth.module').then(mod => mod.AuthModule)
  }
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    SharedModule,

    // Modules
    
  ]
})
export class PagesModule { }
