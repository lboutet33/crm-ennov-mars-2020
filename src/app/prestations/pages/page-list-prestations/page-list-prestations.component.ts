import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StatePrestation } from 'src/app/shared/enums/state-prestation.enum';
import { BtnAction } from 'src/app/shared/interfaces/btn-action';
import { BtnHref } from 'src/app/shared/interfaces/btn-href';
import { BtnRoute } from 'src/app/shared/interfaces/btn-route';
import { Prestation } from 'src/app/shared/models/prestation';
import { PrestationsService } from '../../services/prestations.service';

@Component({
  selector: 'app-page-list-prestations',
  templateUrl: './page-list-prestations.component.html',
  styleUrls: ['./page-list-prestations.component.scss']
})
export class PageListPrestationsComponent implements OnInit {
  public headers: string[];
  public titre: string;
  public soustitre: string;

  public collection$: Observable<Prestation[]>;
  // public states = StatePrestation; => CODE 1
  public states = Object.values(StatePrestation); // => CODE 2 : permet de ne pas réordonner notre enum

  public btnAddPresta: BtnRoute;
  public btnLinkGoogle: BtnHref;
  public btnAction: BtnAction;

  constructor(private ps: PrestationsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.btnAddPresta = {
      texte: 'Ajouter une prestation',
      route: 'add'
    };
    this.btnLinkGoogle = {
      texte: 'Google',
      href: 'https://www.google.fr'
    };
    this.btnAction = {
      texte: 'action',
      action: true
    };

    // this.ps.collection.subscribe((datas) => {
    //   this.collection = datas;
    // }) ;
    this.collection$ = this.ps.collection;
    this.headers = [
      'Type',
      'Client',
      'NbJours',
      'TjmHT',
      'Total HT',
      'Total TTC',
      'State'
    ];
    this.route.data.subscribe((datas) => {
      this.titre = datas.title;
      this.soustitre = datas.subtitle;
    });
  }

  changeState(item: Prestation, e) {
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
