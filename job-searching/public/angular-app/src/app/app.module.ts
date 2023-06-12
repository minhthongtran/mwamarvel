import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      path:"",
      component: JobsComponent,
      
    },
    {
      path:"**",
      component: ErrorpageComponent
    }
  ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
