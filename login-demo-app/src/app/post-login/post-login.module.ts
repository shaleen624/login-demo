import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PublicIpHttpService } from './services/public-ip-http.service';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [HomeComponent],
  providers: [
    PublicIpHttpService]
})
export class PostLoginModule { }
