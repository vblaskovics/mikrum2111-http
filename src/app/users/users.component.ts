import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { switchMap, tap } from 'rxjs/operators';

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

    this.users = timer(0, 1000).pipe(
      tap(console.log),
      switchMap(() => this.userService.getUsers())
    );

  }

}
