import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() texte: string;
  @Input() route: string;
  @Input() href: string;
  @Input() action: boolean;

  // pour transmettre au parent :
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onAction(): void {
    this.clicked.emit(); // on transmet au parent un flux de données vide => le parent va capter ce flux vide et déclencher une action
  }

}
