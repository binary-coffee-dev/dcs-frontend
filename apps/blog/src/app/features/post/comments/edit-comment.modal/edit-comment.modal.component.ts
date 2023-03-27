import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import { Comment, EditCommentAction } from '@dcs-libs/shared';

@Component({
  selector: 'app-edit-comment.modal',
  templateUrl: './edit-comment.modal.component.html',
  styleUrls: ['./edit-comment.modal.component.scss']
})
export class EditCommentModalComponent implements OnInit {

  commentError = '';
  commentForm = new UntypedFormGroup({
    body: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<EditCommentModalComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { comment: Comment }
  ) {
  }

  ngOnInit(): void {
    this.commentForm.controls.body.setValue(this.data.comment.body);
  }

  ok() {
    this.store.dispatch(new EditCommentAction(this.data.comment.id, this.commentForm.controls.body.value)).subscribe(() => {
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
