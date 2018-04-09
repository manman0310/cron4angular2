import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CronModule } from './cron/cron.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
