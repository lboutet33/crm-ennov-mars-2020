import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]'
})
export class StateDirective implements OnChanges {
  @Input() appState: any; // ou @Input() appState: State || StateClient
  @HostBinding('class') nomClass: string;
  constructor() {

  }

  ngOnChanges(): void {
    this.nomClass = this.formatClass(this.appState);
    // console.log(this.appState);
  }

  private formatClass(state: any): string {
    return `state-${state.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '').toLowerCase()}`;
  }
}


// passer 1 state à cette directive qui va le récupérer dans une variable depuis le composant parent
// à partir de ce state, on veut générer 1 string qui va correspondre à 1 nom de class
// si appState vaut Annulé => state-annule
// si appState vaut Option => state-option
// si appState vaut Confirmé => state-confirme
// binder la propriété class du host element td avec ce string
