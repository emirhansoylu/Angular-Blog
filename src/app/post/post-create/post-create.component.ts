import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  private mode = 'create';
  private postId: String = '';
  post: Post = { id: '', title: '', content: '' };
  isLoading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = '';
        this.post = { id: '', title: '', content: '' };
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        this.postService.addPost(form.value.title, form.value.content);
      } else {
        this.postService.updatePost(
          this.postId,
          form.value.title,
          form.value.content
        );
      }
      form.resetForm();
    }
    return;
  }
}
