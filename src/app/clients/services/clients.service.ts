import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { StateClient } from 'src/app/shared/enums/state-client.enum';
import { Client } from 'src/app/shared/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private pCollection: Observable<Client[]>;
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.collection = this.http.get<Client[]>(`${this.urlApi}clients`).pipe(
      map((tab) => {
        return tab.map((obj) => {
          return new Client(obj);
        });
      })
    );
}

   // get collection
  public get collection(): Observable<Client[]> {
    return this.pCollection;
  }
  // set collection
  public set collection(col: Observable<Client[]>) {
    this.pCollection = col;
  }

    // update item state
    public changeState(item: Client, state: StateClient) {
      //on va utiliser un objet
      const newItem = new Client({...item}); // création d'un nouvel objet de type Client...ce n'est pas un passage par référence
      newItem.state = state;
      return this.update(newItem);
    }

    // update item
    public update(item: Client) {
      return this.http.patch<Client>(`${this.urlApi}clients/${item.id}`, item)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
    }

    // add item
    public add(item: Client) {
      return this.http.post<Client>(`${this.urlApi}clients`, item)
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

}
