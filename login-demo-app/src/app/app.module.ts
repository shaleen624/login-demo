import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import {NgIdleModule} from '@ng-idle/core';

import { AppComponent } from './app.component';
import { PreLoginModule } from './pre-login/pre-login.module';
import { LoginComponent } from './pre-login/login/login.component';
import { AppInterceptorService } from './services/app-interceptor.service';
import { CommonService } from './services/common.service';
import { CanActivateRouteGuard } from './utilities/can-activate-route.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'home',
    loadChildren: './post-login/post-login.module#PostLoginModule',
    canActivate: [CanActivateRouteGuard]
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
    NgIdleModule.forRoot(),
    PreLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    },
    CommonService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

