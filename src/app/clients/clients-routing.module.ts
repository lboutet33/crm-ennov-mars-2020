import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { PageAddClientComponent } from './pages/page-add-client/page-add-client.component';

const routes: Routes = [
  { path: '',
  component: PageListClientsComponent,
    data: {title: 'Client', subtitle: 'Tous les clients'}
  },
  { path: 'add',
    component: PageAddClientComponent,
    data: {title: 'Client', subtitle: 'Ajouter un client'}
  }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }



