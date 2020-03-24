import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';


@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {
  public utils = this.util; // car on a mis util en private dans le constructeur

  constructor(private util: UtilService) { }

  ngOnInit(): void {
  }



}
