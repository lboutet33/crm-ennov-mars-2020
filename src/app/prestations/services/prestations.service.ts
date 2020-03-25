import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prestation } from 'src/app/shared/models/prestation';
import { environment } from 'src/environments/environment';
import { StatePrestation } from 'src/app/shared/enums/state-prestation.enum';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private pCollection: Observable<Prestation[]>;
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.collection = this.http.get<Prestation[]>(`${this.urlApi}prestations`).pipe(
      map((tab) => {
        return tab.map((obj) => {
          return new Prestation(obj);
        });
      })
    );
  }
  // get collection
  public get collection(): Observable<Prestation[]> {
    return this.pCollection;
  }
  // set collection
  public set collection(col: Observable<Prestation[]>) {
    this.pCollection = col;
  }

  // update item state
  public changeState(item: Prestation, state: StatePrestation) {
    //on va utiliser un objet
    const newItem = new Prestation({...item}); // création d'un nouvel objet de type Prestation...ce n'est pas un passage par référence
    newItem.state = state;
    return this.update(newItem);
  }

  // update item
  public update(item: Prestation) {
    return this.http.patch<Prestation>(`${this.urlApi}prestations/${item.id}`, item);
  }

  // add item

  // delete idem

  // get item by id
}
