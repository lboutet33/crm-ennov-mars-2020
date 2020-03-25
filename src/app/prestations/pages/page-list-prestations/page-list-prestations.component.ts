import { Component, OnInit } from '@angular/core';
import { StatePrestation } from 'src/app/shared/enums/state-prestation.enum';
import { Prestation } from 'src/app/shared/models/prestation';
import { PrestationsService } from '../../services/prestations.service';

@Component({
  selector: 'app-page-list-prestations',
  templateUrl: './page-list-prestations.component.html',
  styleUrls: ['./page-list-prestations.component.scss']
})
export class PageListPrestationsComponent implements OnInit {
  public headers: string[];
  public collection: Prestation[];
  // public states = StatePrestation; => CODE 1
  public states = Object.values(StatePrestation); // => CODE 2 : permet de ne pas réordonner notre enum

  constructor(private ps: PrestationsService) { }

  ngOnInit(): void {
    this.ps.collection.subscribe((datas) => {
      this.collection = datas;
      console.log(this.collection);
    }) ;
    this.headers = ['Type', 'Client', 'NbJours', 'TjmHT', 'Total HT', 'Total TTC', 'State'];
  }

  changeState(item: Prestation, e) {
    this.ps.changeState(item, e.target.value).subscribe(
      (res) => {
        item.state = res.state;
      }
    );
  }
}
