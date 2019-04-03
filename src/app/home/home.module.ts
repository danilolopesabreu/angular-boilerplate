import { SignupService } from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    VmessageModule,
    RouterModule,
    HomeRoutingModule
  ],
  declarations: [SigninComponent, SignupComponent, HomeComponent],
  providers:[SignupService]
})
export class HomeModule { }
