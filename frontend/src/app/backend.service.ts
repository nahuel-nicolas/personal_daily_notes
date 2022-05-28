import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private backendURL = 'http://127.0.0.1:8000/';  // URL to web backend api
  private notesURL = this.backendURL + 'note/';

  /** POST: add a new note to the server */
  addNote(note: Note): Observable<Note> {
    const response = this.http.post<Note>(this.notesURL, note, this.httpOptions).pipe(
      tap((newNote: Note) => this.log(`added hero w/ note=${newNote}`)),
      catchError(this.handleError<Note>('addNote'))
    );
    return response
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`BackendService: ${message}`);
  }
}
