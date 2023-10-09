import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
// Components
import { AuthComponent } from './auth.component'
import { AddPropertyComponent } from './add-property/add-property.component'
import { EditPropertyComponent } from './edit-property/edit-property.component'
import { PropertyListingComponent } from './property-listing/property-listing.component'
import { PropertyDetailsComponent } from './property-details/property-details.component'
import { AddDeveloperComponent } from './add-developer/add-developer.component'
import { DeveloperListingComponent } from './developer-listing/developer-listing.component'
import { ContactSubmitsComponent } from './contact-submits/contact-submits.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'add-property',
        component: AddPropertyComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit-property/:id',
        component: EditPropertyComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'property-listing',
        component: PropertyListingComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'property-details/:id',
        component: PropertyDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'add-developer',
        component: AddDeveloperComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'developer-listing',
        component: DeveloperListingComponent,
        canActivate: [AuthGuardService]
      },      
      {
        path: 'contact-submits',
        component: ContactSubmitsComponent,
        canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
