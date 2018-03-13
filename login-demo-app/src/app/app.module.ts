import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { PreLoginModule } from './pre-login/pre-login.module';
import { LoginComponent } from './pre-login/login/login.component';
import { AppInterceptorService } from './app-interceptor.service';

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
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    PreLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

