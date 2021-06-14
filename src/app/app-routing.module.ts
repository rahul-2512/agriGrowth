import { PredictionComponent } from './components/prediction/prediction.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthService]
  },
  {
    path: 'requestForm',
    component: RequestFormComponent,
    canActivate: [AuthService]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'prediction',
    component: PredictionComponent,
    canActivate: [AuthService]
  },
  {
    path:'upload',
    component: PredictionComponent,
    canActivate: [AuthService]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
