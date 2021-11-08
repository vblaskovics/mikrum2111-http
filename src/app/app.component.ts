import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mikrum2111-http';

  constructor(private userService:UserService){}

  ngOnInit(){
    console.log('RXJS + HttpClient');
    


  }
}
