import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = new Array<User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe(res => {
    //   this.users = res;
    // })

    timer(0, 1000).pipe(
      switchMap(() => this.userService.getUsers())
    ).subscribe(res => {
      this.users = res;
    });
  }

}
