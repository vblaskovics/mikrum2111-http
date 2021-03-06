import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { User } from './user';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API: string = 'https://jsonplaceholder.typicode.com/users';

  private userStream:Observable<User[]>;

  constructor(private httpClient: HttpClient) {
    this.userStream = timer(0, 1000).pipe(
      switchMap(() => this.getUsers()),
      share()
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API}`).pipe(
      catchError(this.handleError)
    );
  }

  getUsersStream(): Observable<User[]> {
    return this.userStream;
  }

  getUserByUsername(username:string): Observable<User> {
    let params = new HttpParams().set('username', username);
    return this.httpClient.get<User[]>(this.API, {params:params}).pipe(
      map(users => users[0])
    )
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
