import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.log('Client-side error occured:', error.error);
    } else {
      // Server-side error
      console.log('Server-side error with code:', error.status, 'body:', error.error);
    }
    return throwError('Something bad happened :(');
  }

}
