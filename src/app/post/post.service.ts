import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts(): void {
    this.httpClient
      .get<{ message: String; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: String, content: String) {
    const post: Post = { id: 'null', title: title, content: content };
    this.httpClient
      .post<{ message: String }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
