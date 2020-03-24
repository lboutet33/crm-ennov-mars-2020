import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestation } from 'src/app/shared/models/prestation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private pCollection: Observable<Prestation[]>;
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.collection = this.http.get<Prestation[]>(`${this.urlApi}prestations`);
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

  // update item

  // add item

  // delete idem

  // get item by id
}
