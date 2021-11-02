import { Component, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // users = new Array<User>();
  users!:Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe(res => {
    //   this.users = res;
    // })

    // HIBAKEZELÉS#1
    // this.users = timer(0, 1000).pipe(
    //   tap(console.log),
    //   switchMap(() => this.userService.getUsers()),
    //   catchError(errorMsg => {
    //     window.alert(errorMsg);
    //     return of([]);
    //   })
    // )
    // HIBAKEZELÉS#2
    this.users = timer(0, 1000).pipe(
      tap(console.log),
      switchMap(() => this.userService.getUsers().pipe(
        catchError(errorMsg => {
          window.alert(errorMsg);
          return of([]);
        })
      ))
    )

  }

}
