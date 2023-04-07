import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ButtombarComponent } from './buttombar/buttombar.component';
import { FilterComponent } from './filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TaskStoreService } from './task-store.service';
import { BackendService } from './backend.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ButtombarComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [TaskStoreService, BackendService],
  bootstrap: [AppComponent]
})

export class AppModule { }
