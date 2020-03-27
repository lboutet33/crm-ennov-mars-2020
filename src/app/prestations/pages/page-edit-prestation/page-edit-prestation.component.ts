import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Prestation } from 'src/app/shared/models/prestation';
import { PrestationsService } from '../../services/prestations.service';

@Component({
  selector: 'app-page-edit-prestation',
  templateUrl: './page-edit-prestation.component.html',
  styleUrls: ['./page-edit-prestation.component.scss']
})
export class PageEditPrestationComponent implements OnInit {
  public titre: string;
  public soustitre: string;
  public item$: Observable<Prestation>; //déclaré avec la valeur null
  // private ItemId: any;

  constructor(
    private ps: PrestationsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((datas) => {
      this.titre = datas.title;
      this.soustitre = datas.subtitle;
    });
    //récupérer l'id
    // le switchmap gère automatiquement le subscribe et le unsubscribe...c'est plus joli que la 2ième solution dessus en commentaire (mais qui fonctionne aussi)
    this.item$ = this.route.paramMap.pipe(
      // switchMap((params: ParamMap) => {
      //   this.ItemId = params.get('id');
      //   return this.ps.getItemById(this.ItemId);
      //   }
      //   )
      switchMap((params: ParamMap) =>
         this.ps.getItemById(params.get('id')) // return implicite...ne pas oublier de l'ajouter comme ci-dessus
        )
    );
    // this.route.paramMap.subscribe((data) => {
    //   console.log(data.get('id'));
    //   this.item$ = this.ps.getItemById(data.get('id')); // permet d'initialiser item$ après le chargement de la page uniquement...
    // })


  }

  public update(item: Prestation) {
    // item.id = this.ItemId;
    this.ps.update(item).subscribe((res) => {
      // traitement de la réponse de l'API
      // this.router.navigate(['prestations']); // chemin direct
      this.router.navigate(['../../'], {relativeTo: this.route}); // chemin de relatif
    });

  }
}
