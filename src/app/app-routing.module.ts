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
import { Edit2PageComponent } from './components/employees/employee-list/edit2-page/edit2-page.component';
import { Edit1PageComponent } from './components/employees/employee-list/edit1-page/edit1-page.component';

// const routes: Routes = [];

export const parentRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "register",
    component: UserComponent
    // children: [{ path: "", component: RegisterComponent }]
  },
  {
    path: "login",
    component: LoginComponent
    // children: [{ path: "", component: LoginComponent }]
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
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
  },
  {
    path: "edit1-page",
    component: Edit1PageComponent
  }
];
export const appRoutes: Routes = [
  {
    path: "emp-list",
    component: EmployeeListComponent,
    children: [
      // { path: "", redirectTo: "tracks" },
      // { path: "edit1-page", component: Edit1PageComponent, pathMatch: "full" }

      // {
      //   path: "",
      //   redirectTo: "/emp-list/edit1-page", //full child path
      //   pathMatch: "full"
      // },
      {
        path: "edit2-page",
        component: Edit2PageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
    RouterModule.forRoot(parentRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
