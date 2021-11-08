import { Component } from '@angular/core';
import { forkJoin, timer } from 'rxjs';
import { delay, switchMap, timeout } from 'rxjs/operators';
import { CommentService } from './comment/comment.service';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mikrum2111-http';

  constructor(private userService:UserService,
    private postService:PostService,
    private commentService:CommentService){}

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


  ngOnInit(){
    console.log('RXJS + HttpClient');
    // this.createPosts();
    // this.collectComments();
    // this.printNumberOfUsersPosts('Bret');
    this.printUsersAndPostsCount();
  }
}
