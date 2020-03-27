import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

  public collection$: BehaviorSubject<Prestation[]> = new BehaviorSubject(null);// observable chaud initialisée avec null pour gérer le refresh auto après delete par ex
  // public states = StatePrestation; => CODE 1
  public states = Object.values(StatePrestation); // => CODE 2 : permet de ne pas réordonner notre enum

  public btnAddPresta: BtnRoute;
  public btnLinkGoogle: BtnHref;
  public btnAction: BtnAction;

  constructor(
    private ps: PrestationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

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

    // this.ps.collection.subscribe(); // 1 premier subscribe qui permet dans le service de mettre à jour this.collection (qui fait le map + le tap et modifie le flux de données du behaviorsubject collection$)
    this.ps.collection.subscribe((col) => {
      this.collection$.next(col);
    });
    //this.collection$ = this.ps.collection$;
    this.headers = [
      'Type',
      'Client',
      'NbJours',
      'TjmHT',
      'Total HT',
      'Total TTC',
      'State',
      'delete'
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

  delete(item: Prestation) {
    this.ps.delete(item).subscribe(
      (res) => {
        this.ps.collection.subscribe((col) => {
          this.collection$.next(col);
        });
      }

    );
  }

  public onEdit(item: Prestation) {
    this.router.navigate(['prestations', 'edit', item.id]);
  }
}
