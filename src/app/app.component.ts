import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { combineLatest, forkJoin, merge, timer } from 'rxjs';
import { catchError, delay, filter, map, switchMap, tap, timeout } from 'rxjs/operators';
import { CommentService } from './comment/comment.service';
import { Post } from './post/post';
import { PostService } from './post/post.service';
import { User } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mikrum2111-http';
  API = 'https://jsonplaceholder.typicode.com';

  constructor(private userService:UserService,
    private postService:PostService,
    private commentService:CommentService, private http:HttpClient){}

  createPosts = async () => {
    let users = await this.userService.getUsers().toPromise();
    let posts = await this.postService.getPosts().pipe(
      timeout(30000)
    ).toPromise();

    let results:any[] = [];
    posts.forEach((p) => {
      let username = users.find(u => u.id === p.userId)?.username;
      results.push({...p, username});
    })
    console.log(results);
  }

  collectComments = async () => {
    let posts = await this.postService.getPosts().toPromise();
    let comments = await this.commentService.getComments().toPromise();

    let results:any[] = [];
    let postsA:any = {}
    posts.forEach(p => {
      if (p.title.indexOf('a') !== -1){
        postsA[p.id] = p;
      }
    });
    
    comments.forEach(c => {
      if  (postsA[c.postId]) {
        results.push(c);
      }
    })

    console.log(results);
  }


  // Sequential request example
  printNumberOfUsersPosts = (username: string) => {
    this.userService.getUserByUsername(username).pipe(
      switchMap(user => this.postService.getPostsByUserId(user.id))
    ).subscribe(posts => {
      console.log(`Number of ${username}'s posts: ${posts.length}`);
    })
  }

  // Parallel requests and async/await
  printUsersAndPostsCount = async () => {
    console.log('Parallel start', new Date().toLocaleTimeString());
    
    let usersAndPosts = await forkJoin({
      users: this.userService.getUsers().pipe(delay(3000)),
      posts: this.postService.getPosts().pipe(delay(5000))
    }).toPromise()
    
    console.log('Users:', usersAndPosts.users.length, 'Posts:', usersAndPosts.posts.length);
    console.log('Parallel end', new Date().toLocaleTimeString());
  }

  // Repeating parallel requests
  printAndRepeatUsersAndPosts = () => {
    console.log('Parallel start', new Date().toLocaleTimeString());
    
    combineLatest([
      timer(0, 1000),
      this.userService.getUsers().pipe(delay(3000)),
      this.postService.getPosts().pipe(delay(5000))
    ]).subscribe((res:[number, User[], Post[]]) => {
      console.log('Results:', res);
      console.log('Parrallel part arrived', new Date().toLocaleTimeString());
    });
  }


  printPhotosCountByEmail = async (email:string) => {
    // Use services in production! It's just an example for async/await
    let user = await this.http.get<User[]>(`${this.API}/users?email=${email}`).toPromise();
    let albums = await this.http.get<any>(`${this.API}/albums?userId=${user[0].id}`).toPromise();
    let photos = await this.http.get<any>(`${this.API}/photos?albumId=${albums[0].id}`).toPromise();
    console.log(photos[0].url);
  }
  
  printPhotosCountByEmailSM = (email:string) => {
    const selectRandomElement = (arr:any) => arr[Math.floor(Math.random() * arr.length)]
    this.http.get<User[]>(`${this.API}/users?email=${email}`).pipe(
      map(selectRandomElement),
      switchMap(user => this.http.get<any>(`${this.API}/albums?userId=${user.id}`)),
      map(selectRandomElement),
      switchMap(album => this.http.get<any>(`${this.API}/photos?albumId=${album.id}`)),
      map(selectRandomElement)
    ).subscribe(photo => console.log(photo.url));
  }

  printByEmailDomain = (userId:number) => {
    let userById = this.http.get<User>(`${this.API}/users/${userId}`);

    let userBiz = userById.pipe(filter(u => u.email.endsWith('.biz')));
    let userNoBiz = userById.pipe(filter(u => !u.email.endsWith('.biz')));

    userBiz.pipe(switchMap(u => this.postService.getPostsByUserId(u.id)))
      .subscribe(posts => {
        console.log('Post count:', posts.length);
      })
    userNoBiz.pipe(switchMap(u => this.http.get<any[]>(`${this.API}/todos?userId=${u.id}`)))
      .subscribe(todos => {
        console.log('Todo count:', todos.length);
      })
  }

  printUsersPostsCount = () => {
    let user1 = this.http.get<User>(`${this.API}/users/1`).pipe(
      delay(2000));
    let user2 = this.http.get<User[]>(`${this.API}/users?name=Ervin%20Howell`).pipe(
      delay(1000),
      map(users => users[0]));
    let user3 = this.http.get<User[]>(`${this.API}/users?username=Samantha`).pipe(
      delay(3000),
      map(users => users[0]));
    let user4 = this.http.get<User[]>(`${this.API}/users?email=Julianne.OConner@kory.org`).pipe(
      delay(4000),
      map(users => users[0]));

    merge(user1, user2, user3, user4).pipe(
      tap(u => console.log('USER', u.id, new Date().toLocaleTimeString())),
      switchMap(u => this.postService.getPostsByUserId(u.id))
    ).subscribe(posts => {
      console.log(posts.length);
    });

  }

  ngOnInit(){
    console.log('RXJS + HttpClient');
    // this.createPosts();
    // this.collectComments();
    // this.printNumberOfUsersPosts('Bret');
    // this.printUsersAndPostsCount();
    // this.printAndRepeatUsersAndPosts();
    // this.printPhotosCountByEmail('Sincere@april.biz');
    // this.printPhotosCountByEmailSM('Sincere@april.biz');
    // this.printByEmailDomain(1);
    // this.printByEmailDomain(2);
    this.printUsersPostsCount();
  }
}
