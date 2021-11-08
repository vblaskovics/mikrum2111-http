import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { timeout } from 'rxjs/operators';
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

  ngOnInit(){
    console.log('RXJS + HttpClient');
    // this.createPosts();
    // this.collectComments();
  }
}
