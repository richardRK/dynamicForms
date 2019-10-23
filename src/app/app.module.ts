import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { UserComponent } from "./components/user/user.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { APP_BASE_HREF } from "@angular/common";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { DashBoardComponent } from "./components/dash-board/dash-board.component";
import { EmployeeService } from "./services/employee.service";
import { EmployeesComponent } from "./components/employees/employees.component";
import { EmployeeComponent } from "./components/employees/employee/employee.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./shared/material/material.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EmployeeListComponent } from "./components/employees/employee-list/employee-list.component";
import { Form1Component } from "./components/employees/form1/form1.component";
import { Form2Component } from "./components/employees/form2/form2.component";
import { MatDialogRef } from "@angular/material";
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    DashBoardComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    Form1Component,
    Form2Component,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    EmployeeService,
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [Form1Component]
})
export class AppModule {}
