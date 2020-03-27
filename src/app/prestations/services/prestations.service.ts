import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { StatePrestation } from 'src/app/shared/enums/state-prestation.enum';
import { Prestation } from 'src/app/shared/models/prestation';
import { environment } from 'src/environments/environment';

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
    return this.http.patch<Prestation>(`${this.urlApi}prestations/${item.id}`, item)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // add item
  public add(item: Prestation) {
    return this.http.post<Prestation>(`${this.urlApi}prestations`, item)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // delete idem
  public delete(item: Prestation) {
    return this.http.delete(`${this.urlApi}prestations/${item.id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // get item by id
  public getItemById(id: string): Observable<Prestation> {
    return this.http.get<Prestation>(`${this.urlApi}prestations/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

}
