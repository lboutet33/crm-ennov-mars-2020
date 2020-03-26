import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { ClientsService } from '../../services/clients.service';
import { BtnRoute } from 'src/app/shared/interfaces/btn-route';
import { StateClient } from 'src/app/shared/enums/state-client.enum';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit {
  public headers: string[];
  public titre: string;
  public soustitre: string;

  public collection$: Observable<Client[]>;

  public states = Object.values(StateClient); // => CODE 2 : permet de ne pas réordonner notre enum

  public btnAddClient: BtnRoute;

    constructor(
    private ps: ClientsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.btnAddClient = {
      texte: 'Ajouter un client',
      route: 'add'
    };

    // this.ps.collection.subscribe((datas) => {
    //   this.collection = datas;
    // }) ;
    this.collection$ = this.ps.collection;
    this.headers = [
      'name',
      'email',
      'state'
    ];
    this.route.data.subscribe((datas) => {
      this.titre = datas.title;
      this.soustitre = datas.subtitle;
    });
  }

  changeState(item: Client, e) {
    this.ps.changeState(item, e.target.value).subscribe(
      (res) => {
        item.state = res.state;
      }
    );
  }

  public openPopup() {
    console.log('popup active');

  }

}
