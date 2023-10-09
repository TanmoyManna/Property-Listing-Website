import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@project/material.module';
import { ModalModule } from '@project/modal/modal.module';
import { SwiperModule } from 'swiper/angular';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailsComponent } from './property-details/property-details.component';
@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    PropertyListingComponent,
    PropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule,
    ModalModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
