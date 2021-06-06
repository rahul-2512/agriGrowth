import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'requestForm',
    component: RequestFormComponent,
    canActivate: [LoginGuardService]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
