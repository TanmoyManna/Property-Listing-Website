import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
