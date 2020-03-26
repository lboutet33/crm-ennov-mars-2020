import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { PageAddClientComponent } from './pages/page-add-client/page-add-client.component';
import { FormPrestaComponent } from '../prestations/components/form-presta/form-presta.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageListClientsComponent, PageAddClientComponent, FormClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
