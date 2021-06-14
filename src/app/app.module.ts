import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { PredictionComponent } from './components/prediction/prediction.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    RequestFormComponent,
    ProfileComponent,
    HeaderComponent,
    PredictionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPageScrollCoreModule.forRoot({ duration: 800 }),
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
  ],
  entryComponents: [],
  providers: [
    AuthService,AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
