import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private postId: string = '';
  private mode = 'create';

  post: Post = { id: '', title: '', content: '', imagePath: '', creator: '' };

  imagePath: string = '';
  isLoading = false;
  form: FormGroup;

  constructor(public postService: PostService, public route: ActivatedRoute) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

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
            imagePath: postData.imagePath,
            creator: postData.creator,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = '';
        this.post = {
          id: '',
          title: '',
          content: '',
          imagePath: '',
          creator: '',
        };
      }
    });
  }

  onSavePost() {
    if (this.form.valid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        this.postService.addPost(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      } else {
        this.postService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      }
      this.form.reset();
    }
    return;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = reader.result as string;
      };
      this.form.patchValue({ image: file });
      this.form.controls.image.updateValueAndValidity();
      reader.readAsDataURL(file);
    }
  }
}
