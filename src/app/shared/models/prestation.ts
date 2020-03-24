import { StatePrestation } from '../enums/state-prestation.enum';
import { PrestationsI } from '../interfaces/prestations-i';

export class Prestation implements PrestationsI {
  id: number;
  typePresta: string;
  client: string;
  tjmHt = 1200;
  nbJours = 1;
  tva = 20;
  state = StatePrestation.OPTION;
  comment: string;
  constructor(obj?: Partial<Prestation>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
  totalHt(): number {
    return this.tjmHt * this.nbJours;
  }
  totalTtc(): number {
    if (this.tva <= 0) {
      return this.totalHt();
    }
    return this.totalHt() * (1 + this.tva / 100);
  }
}
