import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HelloComponent } from './hello.component';
import { EmployeeComponent } from './employee/employee.component';
import { RowEditComponent } from './row-edit/row-edit.component';

/******** Services Import *****************/
import { EmployeeService } from './services/employee.service';

@NgModule({
  imports: [
    BrowserModule,
    ToastrModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    EmployeeComponent,
    RowEditComponent,
    FooterComponent,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
