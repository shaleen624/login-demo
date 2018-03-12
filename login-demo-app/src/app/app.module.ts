import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { PreLoginModule } from './pre-login/pre-login.module';
import { LoginComponent } from './pre-login/login/login.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'home',
    loadChildren: './post-login/post-login.module#PostLoginModule',
    // data: { title: 'Home' }
  }, {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    PreLoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

