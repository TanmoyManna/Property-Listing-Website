import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@project/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { ContactSubmitsComponent } from './contact-submits/contact-submits.component';
import { SharedModule } from './../shared/shared.module';
import { DeveloperListingComponent } from './developer-listing/developer-listing.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  declarations: [
    AuthComponent,
    AddPropertyComponent,
    AddDeveloperComponent,
    PropertyListingComponent,
    ContactSubmitsComponent,
    DeveloperListingComponent,
    EditPropertyComponent,
    PropertyDetailsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    SwiperModule,
    SharedModule
  ]
})
export class AuthModule { }
