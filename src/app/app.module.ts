import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HelloComponent } from './hello.component';
import { EmployeeComponent } from './employee/employee.component';
import { RowEditComponent } from './row-edit/row-edit.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

/******** Services Import *****************/
import { EmployeeService } from './services/employee.service';

@NgModule({
  imports: [
    BrowserModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
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
    CreateEmployeeComponent,
    FooterComponent,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
