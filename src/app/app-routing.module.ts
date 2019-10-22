import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';


// const routes: Routes = [];



export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'register', component: UserComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'login', component: LoginComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard', component: DashBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})




export class AppRoutingModule {




}
