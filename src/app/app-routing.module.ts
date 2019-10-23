import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashBoardComponent } from "./components/dash-board/dash-board.component";
import { EmployeeListComponent } from "./components/employees/employee-list/employee-list.component";
import { CreatePageComponent } from "./components/create-page/create-page.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";

// const routes: Routes = [];

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "register",
    component: UserComponent,
    children: [{ path: "", component: RegisterComponent }]
  },
  {
    path: "login",
    component: LoginComponent,
    children: [{ path: "", component: LoginComponent }]
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "emp-list",
    component: EmployeeListComponent
  },
  {
    path: "dashboard",
    component: DashBoardComponent
  },

  {
    path: "create-page",
    component: CreatePageComponent
  },
  {
    path: "edit-page",
    component: EditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
