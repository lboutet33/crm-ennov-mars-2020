import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, NavComponent, FooterComponent],
  exports: [HeaderComponent, NavComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
