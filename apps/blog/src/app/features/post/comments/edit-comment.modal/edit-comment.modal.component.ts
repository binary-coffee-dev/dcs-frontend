import { Component, OnInit, inject, signal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import { Comment, EditCommentAction } from '@dcs-libs/shared';

@Component({
  selector: 'app-edit-comment.modal',
  templateUrl: './edit-comment.modal.component.html',
  styleUrls: ['./edit-comment.modal.component.scss'],
  standalone: false
})
export class EditCommentModalComponent implements OnInit {
  private dialogRef = inject<MatDialogRef<EditCommentModalComponent>>(MatDialogRef);
  private store = inject(Store);
  data = inject<{ comment: Comment }>(MAT_DIALOG_DATA);

  commentError = signal<string>('');
  commentForm = new UntypedFormGroup({
    body: new UntypedFormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.commentForm.controls['body'].setValue(this.data.comment.body);
  }

  ok() {
    this.store
      .dispatch(
        new EditCommentAction(this.data.comment.id, this.commentForm.controls['body'].value)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
