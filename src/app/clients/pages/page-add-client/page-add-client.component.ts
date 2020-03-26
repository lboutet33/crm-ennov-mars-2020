import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-add-client',
  templateUrl: './page-add-client.component.html',
  styleUrls: ['./page-add-client.component.scss']
})
export class PageAddClientComponent implements OnInit {
  public titre: string;
  public soustitre: string;

  constructor(
    private ps: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((datas) => {
      this.titre = datas.title;
      this.soustitre = datas.subtitle;
    });
  }

  public add(item: Client) {
    console.log(item);
    this.ps.add(item).subscribe((res) => {
      // traitement de la réponse de l'API
      //this.router.navigate(['prestations']); // chemin direct
      this.router.navigate(['../'], {relativeTo: this.route}); // chemin de relatif
    });

  }
}
