import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutes,
      HttpClientModule,
      RouterModule,
      AngularFileUploaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }