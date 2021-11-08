import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API: string = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.API}`);
  }
}
